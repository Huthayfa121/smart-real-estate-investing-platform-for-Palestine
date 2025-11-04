import { Router } from 'express';
import {
  getRecommendations,
  getRecommendationById,
  generateNewRecommendations,
  updateRecommendationStatus,
  deleteRecommendation,
} from '../controllers/recommendation.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

router.use(protect); // All routes are protected

router.route('/').get(getRecommendations);

router.post('/generate', generateNewRecommendations);

router
  .route('/:id')
  .get(getRecommendationById)
  .put(updateRecommendationStatus)
  .delete(deleteRecommendation);

export default router;

