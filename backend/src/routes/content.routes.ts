import { Router } from 'express';
import {
  getContent,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
} from '../controllers/content.controller';
import { protect, restrictTo } from '../middleware/auth.middleware';

const router = Router();

router.route('/').get(getContent).post(protect, restrictTo('advisor', 'admin'), createContent);

router
  .route('/:id')
  .get(getContentById)
  .put(protect, restrictTo('advisor', 'admin'), updateContent)
  .delete(protect, restrictTo('admin'), deleteContent);

export default router;

