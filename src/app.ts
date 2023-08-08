import 'dotenv/config';

import express, { Express, Request, Response } from 'express';

import chatRoutes from './routes/chat';

import connectDB from './config/db';
import enableCORS from './middlewares/cors';


const app: Express = express();
const PORT = process.env.PORT || 3000;

connectDB();

// Middleware configurations
app.use(express.json());
app.use(enableCORS);

app.use('/api', chatRoutes);


app.get('/', (req: Request, res: Response) => {
    res.send('Hello from TypeScript backend!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
