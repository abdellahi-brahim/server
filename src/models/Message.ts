import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
    content: string;
    type: 'user' | 'bot';
    timestamp: Date;
}

const messageSchema: Schema = new Schema({
    content: { type: String, required: true },
    type: { type: String, enum: ['user', 'bot'], required: true },
    timestamp: { type: Date, required: true, default: Date.now }
});

export default mongoose.model<IMessage>('Message', messageSchema);
