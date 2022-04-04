import 'dotenv/config';
import Users from '../models/user.js';
import catchAsync from '../utils/catchAsync.js';
import transactionDetails from '../models/transaction.js';
import txnMail from '../utils/transactionEmail.js';
import ethers from 'ethers';
import tokenContract from '../abi/contract.js';
import URL from '../utils/nodeUrl.js';
import logger from '../config/logger.js';
import {
  handleSuccess,
  handleError,
  unauthorized,
} from '../helpers/responseHandler.js';

export const transferMoney = catchAsync(async (req, res, next) => {
  const amt = req.body.amount;
  const recieveName = req.body.name;

  // fetch details from user
  if (!amt || !recieveName) {
    return next(
      handleError({
        res,
        err_msg: `Please provide name and amount for transaction`,
      })
    );
  } else {
    const details = {
      name: req.body.name,
      amount: parseInt(amt),
    };

    // check reciever name in DB
    const recieverUser = await Users.find(details);

    if (recieverUser.length === 0) {
      return next(
        handleError({
          res,
          err_msg: `No user found with this name`,
        })
      );
    }