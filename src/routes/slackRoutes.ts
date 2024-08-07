import { Router } from 'express';
import { sendLink } from '../controllers/slackController';

const router = Router();

router.post('/send', sendLink);

export default router;
