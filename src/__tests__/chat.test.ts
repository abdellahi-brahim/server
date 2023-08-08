import request from 'supertest';
import app from '../app';
import Message from '../models/Message';

beforeEach(async () => {
    await Message.deleteMany({});
});

describe('Chat API', () => {
    it('should post a user message and receive a bot response', async () => {
        const response = await request(app)
            .post('/api/message')
            .send({ content: 'Hello!' })
            .expect(200);

        expect(response.body.userMessage.content).toEqual('Hello!');
        expect(response.body.userMessage.type).toEqual('user');
        expect(response.body.botMessage.content).toContain('Bot says: Hello!');
        expect(response.body.botMessage.type).toEqual('bot');
    });

    it('should fetch chat history', async () => {
        await new Message({ content: 'Test message', type: 'user' }).save();

        const response = await request(app)
            .get('/api/chat')
            .expect(200);

        expect(response.body.length).toEqual(1);
        expect(response.body[0].content).toEqual('Test message');
        expect(response.body[0].type).toEqual('user');
    });
});

afterAll(async () => {
    // Close any lingering connections to the database
    await Message.collection.conn.close();
});
