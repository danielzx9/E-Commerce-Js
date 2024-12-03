const express = require('express');
const router = express.Router();
const Product = require('../models/Product')
const {protect, admin} = require('../middleware/auth');

//obtener todos los produtos
router.get('/', async(req, res) => {
    try{
        const products = await Product.find();
        res.json(products);

    } catch(error){
        res.status(500).json({message: error.message});
    }
});

router.post('/', protect, admin, async (req, res) => {
    try{
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);

    } catch(error){
        res.status(400).json({message: error.message});
    }
});

router.delete('/:id', protect, admin, async (req, res) =>{
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product) {
            return res. status(404).json({message: 'Producto no encontrado'});

        }
        await product.remove();
        res.json({message:'Producto eliminado'});

    } catch(error){
        res.status(500).json({message: error.message});
    }
});

module.exports = router;