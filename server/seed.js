import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { connectDB, disconnectDB } from "./config/db.js";
import User from "./models/User.js";

dotenv.config();

const seedSeller = async () => {
    try {
        await connectDB();

        const seller = await User.create({
            name: "Seller1",
            email: "seller1@example.com",
            password: await bcrypt.hash("123456", 10),
            role: "seller",
        });

        console.log("Seller user created:", seller._id);
    } catch (error) {
        console.error(error);
        process.exitCode = 1;
    } finally {
        await disconnectDB();
    }
};

seedSeller();