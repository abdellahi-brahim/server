import mongoose from 'mongoose';
require('dotenv').config();

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI!);
        console.log('MongoDB connected...');
    } catch (err) {
        if (err instanceof Error) {
            console.error('Error connecting to MongoDB:', err.message);
        } else {
            console.error('An error occurred:', err);
        }
        // Exit process with failure
        process.exit(1);
    }
};

export default connectDB;
