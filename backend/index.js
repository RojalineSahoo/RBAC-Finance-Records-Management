import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';

import userRoutes from './src/routes/userRoutes.js';
import recordRoutes from './src/routes/recordRoutes.js';
import dashboardRoutes from "./src/routes/dashboardRoutes.js"

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/records', recordRoutes);
app.use('/dashboard',dashboardRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Server initialized successfully',
        success: true
    })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`)
})