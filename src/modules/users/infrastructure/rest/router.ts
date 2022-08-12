import express from 'express';
import UserController from './UserController';

const userController = new UserController();

const router = express.Router();

router.post('/users/:userId/set-role-as-admin', userController.setRoleAsAdmin.bind(userController));

export default router;
