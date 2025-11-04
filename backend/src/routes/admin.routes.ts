import { Router } from 'express';
import { getStats, getAllUsers, updateUser, deleteUser } from '../controllers/admin.controller';
import { protect, restrictTo } from '../middleware/auth.middleware';

const router = Router();

router.use(protect, restrictTo('admin')); // All routes are admin only

router.get('/stats', getStats);

router.route('/users').get(getAllUsers);

router.route('/users/:id').put(updateUser).delete(deleteUser);

export default router;

