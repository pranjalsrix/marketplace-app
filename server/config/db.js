import mongoose from 'mongoose';

const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");
    console.log("Database:", mongoose.connection.name);
};

const disconnectDB = async () => {
    await mongoose.connection.close();
    console.log("MongoDB Disconnected");
};

export {connectDB, disconnectDB};