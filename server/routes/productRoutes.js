import express from 'express';
import Product from '../models/Product.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware('seller'), async (req, res) => {
    try {
        const { name, description, price, image} = req.body;

        const product = await Product.create({
            name,
            description,
            price,
            image,
            seller: req.user.userId,
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: "Server error",
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({
            message: "Invalid product ID"
        });
    }
});

router.put('/:id', authMiddleware, roleMiddleware('seller'), async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        if (product.seller.toString() !== req.user.userId) {
            return res.status(403).json({
                message: 'You are not authorized to update this product'
            });
        }

        const { name, description, price, image } = req.body;

        product.name = name ?? product.name;
        product.description = description ?? product.description;
        product.price = price ?? product.price;
        product.image = image ?? product.image;

        await product.save();

        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

router.delete('/:id', authMiddleware, roleMiddleware('seller'), async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        if (product.seller.toString() !== req.user.userId) {
            return res.status(403).json({
                message: 'You are not authorized to delete this product'
            });
        }

        await product.deleteOne();

        res.status(200).json({
            message: 'Product deleted successfully'
        });
    } catch (error) {
        res.status(400).json({
            message: "Invalid product ID"
        });
    }
});

export default router;