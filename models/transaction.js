import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  from: String,
  to: String,
  amount: String,
  txndate: String,
  transactionHash: String,
});

const transactionDetails = mongoose.model('Transaction', transactionSchema);
export default transactionDetails;
