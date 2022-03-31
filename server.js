require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.DB)
  .then(() => console.log('DB connection successful!'));

//Local DB connection
// mongoose
//   .connect(process.env.LOCAL_DB)
//   .then(() => console.log('Local DB connection successful'));

const authRoutes = require('./routes/auth');
const allUser = require('./routes/user');
const transaction = require('./routes/transaction');

app.use('/wallet/', authRoutes);
app.use('/wallet/', allUser);
app.use('/wallet/', transaction);

const port = process.env.port || 8000;
app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});
