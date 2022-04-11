import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  emailToken: String,
  isVerified: Boolean,
  publicKey: String,
  tokenBalance: Number,
});

const Users = mongoose.model('User', userSchema);
export default Users;
