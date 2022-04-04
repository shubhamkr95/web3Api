import 'dotenv/config';
const path = require('path');
const express = require('express');
import express from 'express';
import logger from './config/logger.js';

const app = express();
app.use(express.json());

const authRoutes = require('./routes/auth');
const allUser = require('./routes/user');
const transaction = require('./routes/transaction');

app.use('/wallet/', authRoutes);
app.use('/wallet/', allUser);
app.use('/wallet/', transaction);

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});
