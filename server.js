import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import logger from './config/logger.js';
import { AppError, handleError } from './helpers/responseHandler.js';
import dbConnect from './connections/database.js';

const app = express();
app.use(express.json());

import authRoutes from './routes/auth.js';
import allUser from './routes/user.js';

app.use('/wallet/', authRoutes);
app.use('/wallet/', allUser);

app.all('*', (req, res, next) => {
  next(
    handleError({
      res,
      data: `Cannot find ${req.originalUrl} on this server!`,
    })
  );
});

const port = process.env.port || 3000;
app.listen(port, () => {
  logger.info(`Connected to port ${port}`);
});
