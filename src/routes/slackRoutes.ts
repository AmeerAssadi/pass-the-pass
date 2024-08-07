import { Router } from 'express';
import { sendLink } from '../controllers/slackController';

const router = Router();

// Define your routes
router.post('/send', sendLink);

export default router;
