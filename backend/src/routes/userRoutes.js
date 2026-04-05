import express from 'express';
import { getAllUserController, createNewUserController } from '../controllers/userController.js';

const router = express.Router();

router.post('/', createNewUserController);
router.get('/', getAllUserController);

export default router;