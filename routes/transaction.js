import express from 'express';

import protect from '../middleware/isAuth.js';
import { transferMoney, transactionsDetail } from '../controllers/transfer.js';

const router = express.Router();

router.post('/transfer', protect, transferMoney);

router.get('/transfer', protect, transactionsDetail);

export default router;
