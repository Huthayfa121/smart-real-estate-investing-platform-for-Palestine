import { Router } from 'express';
import { getConsent, updateConsent } from '../controllers/consent.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

router.use(protect); // All routes are protected

router.route('/').get(getConsent).put(updateConsent);

export default router;

