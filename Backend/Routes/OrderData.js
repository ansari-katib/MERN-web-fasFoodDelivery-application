import express from 'express';
const router = express.Router();
import Order from '../models/Orders.js';

router.post('/orderData', async (req, res) => {
    const { order_data, email } = req.body;

    if (!order_data || !email) {
        return res.status(400).json({ success: false, message: "Missing order data or email" });
    }

    try {
        let existingOrder = await Order.findOne({ email });

        if (!existingOrder) {
            // If no order exists for the user, create a new entry
            await Order.create({
                email,
                order_data: [order_data] // Wrap order_data in an array if it's not already
            });
            return res.json({ success: true });
        } else {
            // If order already exists, update it
            await Order.findOneAndUpdate(
                { email },
                { $push: { order_data: order_data } } // Append new order_data
            );
            return res.json({ success: true });
        }
    } catch (err) {
        console.error(err.message);
        return res.send("Server Error: " + err.message);
    }
});



router.post('/myorderData', async (req, res) => {
    try {
        const userOrder = await Order.findOne({ email: req.body.email });

        if (!userOrder) {
            return res.status(404).json({ success: false, message: "No orders found for this user" });
        }

        // Return just the order_data
        return res.json({ order_data: userOrder.order_data });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Server Error: " + error.message);
    }
});


export default router;
