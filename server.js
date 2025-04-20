import express, { response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import dataRoutes from './routes/dataRoutes.js';
import responseRoutes from './routes/responseRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({limit: '1000mb'}));

app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/response', responseRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));