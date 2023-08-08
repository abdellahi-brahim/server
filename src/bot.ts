import { NlpManager } from 'node-nlp-typescript';

const manager = new NlpManager({ languages: ['en'] });

manager.addDocument('en', 'hello', 'Hello, how can I help you?');
manager.addDocument('en', 'hi', 'Hi there! How can I assist you today?');
manager.addDocument('en', 'how are you', 'I am just a bot, but thanks for asking! How can I assist you?');

(async () => {
    await manager.train();
    manager.save();
})();

const getBotResponse = async (message: string): Promise<string> => {
    const response = await manager.process('en', message);
    return response.answer;
};

export default getBotResponse;
