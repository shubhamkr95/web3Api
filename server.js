import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import logger from './config/logger.js';
import dbConnect from './connections/database.js';

const app = express();
app.use(express.json());

const port = process.env.port || 3000;
app.listen(port, () => {
  logger.info(`Connected to port ${port}`);
});
