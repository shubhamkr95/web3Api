import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Users from '../models/user.js';
import catchAsync from '../utils/catchAsync.js';
import sendEmail from '../utils/email.js';
import crypto from 'crypto';
import { ethers } from 'ethers';
import {
  handleSuccess,
  handleError,
  unauthorized,
} from '../helpers/responseHandler.js';
import tokenContract from '../abi/contract.js';
import URL from '../utils/nodeUrl.js';
import logger from '../config/logger.js';

// JWT token creation
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, res) => {
  const token = signToken(user.id);

  res.cookie('token', token, {
    httpOnly: true,
  });

  res.status('200').json({
    status: 'success',
    token,
    welcome: `Welcome ${user.name}`,
  });
};

// ================
// signup
export const signup = catchAsync(async (req, res, next) => {
  // check for email & password from given input
  if (
    !req.body.email ||
    !req.body.name ||
    !req.body.password ||
    !req.body.address
  ) {
    return next(
      handleError({
        res,
        data: 'Please provide email, name, address and password for signup',
      })
    );
  }

  // encrypt the password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    role: req.body.role,
    emailToken: crypto.randomBytes(64).toString('hex'),
    isVerified: false,
    publicKey: req.body.address,
    tokenBalance: 0,
  };

  // create new user in DB
  const newUser = await Users.create(user);

  // sending email
  const url = `http://${req.headers.host}/wallet/verify-email?token=${newUser.emailToken}`;
  logger.info(url);

  const usrEmail = await Users.findOne({ email: user.email });

  //  logger.info(usrEmail.email, url);
  await sendEmail(usrEmail.email, url);
  const successMsg = `Thanks for registering. please check your email to verify your account`;

  handleSuccess({
    res,
    msg: successMsg,
    data: newUser,
  });
});
