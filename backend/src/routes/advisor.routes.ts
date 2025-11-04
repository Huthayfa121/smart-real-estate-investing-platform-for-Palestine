import { Router } from 'express';
import {
  getAdvisors,
  getAdvisorById,
  createAdvisor,
  updateAdvisor,
  deleteAdvisor,
} from '../controllers/advisor.controller';
import { protect, restrictTo } from '../middleware/auth.middleware';

const router = Router();

router.route('/').get(getAdvisors).post(protect, restrictTo('admin'), createAdvisor);

router
  .route('/:id')
  .get(getAdvisorById)
  .put(protect, restrictTo('advisor', 'admin'), updateAdvisor)
  .delete(protect, restrictTo('admin'), deleteAdvisor);

export default router;

