import express from 'express';
import { saveData, getData, getDataMessages, getFormattedCases, checkUser} from '../controllers/dataController.js';

const router = express.Router();

router.post('/saveData', saveData);
router.get('/getData', getData);
router.get('/getData/messages', getDataMessages);
router.get('/cases', getFormattedCases);
router.get('/verify', checkUser);

export default router;