import { Router } from 'express';
import { generateLink, viewData } from '../controllers/linkController';

const router = Router();

// Define your routes
router.post('/', generateLink);
router.get('/:id', viewData);

export default router;
