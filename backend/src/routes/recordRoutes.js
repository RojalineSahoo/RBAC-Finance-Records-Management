import express from 'express';
import {createRecordController, getRecordController, deleteRecordController, updateRecordController} from "../controllers/recordController.js";

const router = express.Router();

router.post('/', createRecordController);

router.get('/',  getRecordController);

router.put('/:id',  updateRecordController);

router.delete('/:id',  deleteRecordController);

export default router;
