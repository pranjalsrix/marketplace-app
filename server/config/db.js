import mongoose from 'mongoose';

const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");
    console.log("Database:", mongoose.connection.name);
};

export default connectDB;