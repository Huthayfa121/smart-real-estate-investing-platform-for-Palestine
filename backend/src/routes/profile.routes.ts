import { Router } from 'express';
import { getProfile, updateProfile, deleteProfile } from '../controllers/profile.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

router.use(protect); // All routes are protected

router.route('/').get(getProfile).put(updateProfile).delete(deleteProfile);

export default router;

