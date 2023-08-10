// import request from 'supertest';
// import app from '../app';
// import Message from '../models/Message';

// // beforeEach(async () => {
// //     await Message.deleteMany({});
// // });

// describe('Chat API', () => {
//     it('should post a user message and receive a bot response', async () => {
//         const userContent = 'Hello!';
//         const response = await request(app)
//             .post('/api/message')
//             .send({ content: userContent })
//             .expect(200);

//         // Check if the user message is saved correctly
//         const savedUserMessage = await Message.findOne({ content: userContent, type: 'user' });
//         expect(savedUserMessage).not.toBeNull();

//         // Check if the bot has responded and saved its message
//         const savedBotMessage = await Message.findOne({ type: 'bot' });
//         expect(savedBotMessage).not.toBeNull();

//         // Validate the response from the API
//         expect(response.body.userMessage.content).toEqual(userContent);
//         expect(response.body.userMessage.type).toEqual('user');

//         expect(response.body.botMessage.content).toBeDefined();
//         expect(response.body.botMessage.type).toEqual('bot');
//     });

//     it('should fetch chat history', async () => {
//         await new Message({ content: 'Test message', type: 'user', timestamp: new Date() }).save();

//         const response = await request(app)
//             .get('/api/chat')
//             .expect(200);

//         expect(response.body.length).toEqual(1);
//         expect(response.body[0].content).toEqual('Test message');
//         expect(response.body[0].type).toEqual('user');
//     });
// });

// afterAll(async () => {
//     await Message.collection.conn.close();
// });
