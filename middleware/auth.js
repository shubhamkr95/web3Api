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
