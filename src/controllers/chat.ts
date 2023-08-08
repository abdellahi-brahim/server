import { Request, Response } from 'express';
import Message, { IMessage } from '../models/Message';

export const postMessage = async (req: Request, res: Response) => {
    try {
        const userMessage: IMessage = new Message({
            content: req.body.content,
            type: 'user',
            timestamp: new Date()
        });
        await userMessage.save();

        const botMessageContent = "I'm a bot!"
        const botMessage: IMessage = new Message({
            content: botMessageContent,
            type: 'bot',
            timestamp: new Date()
        });
        await botMessage.save();

        res.status(200).json({ userMessage, botMessage });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send message.' });
    }
};

export const getChat = async (req: Request, res: Response) => {
    try {
        const messages = await Message.find().sort('timestamp');
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch chat.' });
    }
};
