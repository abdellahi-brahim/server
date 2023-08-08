import { createServer } from 'http';
import { Server } from 'socket.io';

import app from './app';

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",  // Adjust this to your client's origin in production
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
