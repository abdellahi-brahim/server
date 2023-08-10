import { Request, Response } from 'express';
import Message, { IMessage } from '../models/Message';
import io from '../server';
import { getBotMessage } from '../services/gpt-3-bot';

export const postMessage = async (req: Request, res: Response) => {
    try {
        const userMessage: IMessage = new Message({
            content: req.body.content,
            type: 'user',
            timestamp: new Date()
        });
        await userMessage.save();

        io.emit('message', userMessage);

        const botMessageContent = await getBotMessage(req.body.content);

        const botMessage: IMessage = new Message({
            content: botMessageContent,
            type: 'bot',
            timestamp: new Date()
        });
        
        await botMessage.save();

        io.emit('message', botMessage);

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
