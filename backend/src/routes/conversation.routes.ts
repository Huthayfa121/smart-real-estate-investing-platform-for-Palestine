import { Router } from 'express';
import {
  getConversations,
  getConversationById,
  createConversation,
  addMessage,
  archiveConversation,
} from '../controllers/conversation.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

router.use(protect); // All routes are protected

router.route('/').get(getConversations).post(createConversation);

router.route('/:id').get(getConversationById);

router.post('/:id/messages', addMessage);

router.put('/:id/archive', archiveConversation);

export default router;

