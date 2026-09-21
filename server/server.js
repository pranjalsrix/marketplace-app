import dotenv from 'dotenv';
import express from 'express';
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/health', (req, res) => {
    res.json({
        message: 'Server is running!',
    });
});

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

startServer();
