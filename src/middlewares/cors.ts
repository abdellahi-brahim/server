import { Request, Response, NextFunction } from 'express';
import cors from 'cors';

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};

const enableCORS = (req: Request, res: Response, next: NextFunction) => {
    cors(corsOptions)(req, res, next);
};

export default enableCORS;
