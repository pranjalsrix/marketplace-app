import express from 'express';
import Product from '../models/Product.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
    try {
        const {name, description, price, image, seller} = req.body;

        const products = await Product.create({
            name,
            description,
            price,
            image,
            seller: req.user.userId,
        });
        res.status(201).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;