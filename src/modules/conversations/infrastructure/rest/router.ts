import express from 'express';
import Joi from 'joi';
import validateBody from '../../../../framework/express/validators/validateBody';
import ConversationController from './ConversationController';

const conversationController = new ConversationController();

const router = express.Router();

router.post(
  '/conversations',
  validateBody(
    Joi.object({
      userId: Joi.string().required(),
      filename: Joi.string().required(),
    }),
  ),
  conversationController.create.bind(conversationController),
);

router.get('/conversations', conversationController.list.bind(conversationController));

export default router;
