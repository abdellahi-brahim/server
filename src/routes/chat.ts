import express from 'express';
import { postMessage, getChat } from '../controllers/chat';

const router = express.Router();

router.post('/message', postMessage);
router.get('/chat', getChat);

export default router;
