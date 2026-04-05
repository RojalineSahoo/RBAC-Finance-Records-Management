import express from 'express';
import getDashboardSummaryController from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/', getDashboardSummaryController)

export default router;