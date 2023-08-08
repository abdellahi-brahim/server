import 'dotenv/config';

import express, { Express } from 'express';

import chatRoutes from './routes/chat';

import connectDB from './config/db';
import enableCORS from './middlewares/cors';

const app: Express = express();

// Connect to the database
connectDB();

// Middleware configurations
app.use(express.json());
app.use(enableCORS);

// Routes
app.use('/api', chatRoutes);

app.get('/', (req, res) => {
    res.send('Hello from TypeScript backend!');
});

export default app;