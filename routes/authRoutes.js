import express from 'express';
import { signup, login, getCurrentUser} from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/user', authMiddleware, getCurrentUser);


export default router;
