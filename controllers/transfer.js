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