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

    // fetch details
    const currUser = req.user;
    const id = recieverUser[0].id;
    const recieverName = recieverUser[0].name;
    const senderName = await Users.findById({ _id: currUser.id });
    const amount = details.amount;

    // ===========
    // web3

    // transfer token
    const customHttpProvider = new ethers.providers.JsonRpcProvider(URL);

    //public key of sender
    const senderDetails = await Users.findById({ _id: currUser.id });
    const senderAddress = senderDetails.publicKey;

    const signer1 = customHttpProvider.getSigner(senderAddress);

    const tokenWithSigner = tokenContract.connect(signer1);

    // getting reciever address
    const recieverInfo = await Users.findById({ _id: id });
    const recieverPublicKey = recieverInfo.publicKey;

    const token = amount.toString();

    // parsing amount to hex
    const tokenAmount = ethers.utils.parseUnits(token, 18);

    // sending transacion
    const tx = await tokenWithSigner.transfer(recieverPublicKey, tokenAmount);
    logger.info(`Sender transaction hash : ${tx.hash}`);

    const recievedAmount = await tokenContract.balanceOf(recieverPublicKey);
    const recievedParseAmount = ethers.utils.formatUnits(recievedAmount, 18);
    logger.info(`Receiver token balance:  ${recievedParseAmount}`);

    // update receiver amount
    const recieved = {
      tokenBalance: recievedParseAmount,
    };
    await Users.findOneAndUpdate({ _id: id }, { $set: recieved });

    // update sender amount
    const sendAmount = await tokenContract.balanceOf(senderAddress);
    const sendParsedAmount = ethers.utils.formatUnits(sendAmount, 18);
    logger.info(`sender balance: , ${sendParsedAmount}`);

    const send = {
      tokenBalance: sendParsedAmount,
    };

    await Users.findOneAndUpdate({ _id: currUser.id }, { $set: send });

    // ==============

    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    const transDetail = {
      from: senderName.name,
      to: recieverName,
      amount: `${amount} ATN`,
      txndate: `${date}-${time}`,
      transactionHash: tx.hash,
    };

    // record transactionDetail to DB
    const usrtxn = await transactionDetails.create(transDetail);

    // send confirmation/failure
    let transDetails = await transactionDetails
      .findOne()
      .sort({ field: 'asc', _id: -1 })
      .limit(1);
    transDetails = JSON.stringify(transDetails);

    const email = senderName.email;
    await txnMail(email, transDetails);

    handleSuccess({
      res,
      msg: `Transaction Successful`,
      data: usrtxn,
    });
  }
});
