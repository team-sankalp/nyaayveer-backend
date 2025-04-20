import express from 'express';
import { getRes} from '../controllers/responseController.js';

const router = express.Router();

router.post('/getResponse', getRes);

export default router;