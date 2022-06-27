import express from 'express';
import ConversationController from './ConversationController';

const conversationController = new ConversationController();

const router = express.Router();

router.post('/conversations', conversationController.create.bind(conversationController));

export default router;
