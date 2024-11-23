const express = require('express');
const Order = require('../models/Order');
const {protect} = require ('../middleware/auth');
const router = express.Router();

//crear pedido
router.post('/', protect, async(req,res) =>{
    const {orderItems, totalPrice} = req.body;
    if(orderItems && totalPrice.length === 0){
        return res.status(400).json({message: 'No hay productos en el pedido'});
    }
    try{
        const order = new Order({
            user: req.user._id,
            orderItems,
            totalPrice,
        });
        const savedOrder = await order.save();
        res.status(201).json(savedOrder);

    } catch (error){
        res.status(500).json({message:error.message});
    }
});

// get pedido
router.get('/myorders', protect, async(req,res) => {
    try{
        const orders = await Order.find({user: req.user._id}).populate('orderItems.product');
        res.json(orders);

    } catch (error){
        res.status(500).json({message: error.message});
    }
})

module.exports = router;

