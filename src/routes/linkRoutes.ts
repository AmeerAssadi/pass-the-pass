import { Router } from 'express';
import { generateLink, viewData } from '../controllers/linkController';

const router = Router();

router.post('/generate', generateLink);
router.get('/:id', viewData);

export default router;
