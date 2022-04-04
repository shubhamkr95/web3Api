import express from 'express';

import user from '../controllers/users.js';
import protect from '../middleware/isAuth.js';

const router = express.Router();

router.get('/user', protect, user);

export default router;
