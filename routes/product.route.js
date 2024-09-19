const Product = require('../models/product.model.js');
const validateProduct = require('../validator/product.validator.js');
const { productToProductDto } = require('../mapping/product.mapping.js');

const express = require('express');

const productRouter = express.Router();

productRouter.get('/', async (_req, res) => {
    try {
        const products = await Product.find();
        const productsDto = products.map(product => {
            return productToProductDto(product);
        })
        res.status(200).json(productsDto);
    }
    catch (error) {
        return res.status(500).json({ message: error.message})
    }
})

productRouter.get('/:name', async (req, res) => {
    try {
        const product = await Product.findOne( { name: req.params.name } );
        if (!product)
            return res.status(404).json( { message: 'Product not found' } );
        return res.json(productToProductDto(product));
    }
    catch (error) {
        return res.status(500).json( { message: error.message } );
    }
})

productRouter.post('/', async (req, res) => {
    
    try {
        const validationResult = validateProduct(req.body);

        if (!validationResult.isValid)
            return res.status(400).json(validationResult.errors);

        const exists = await Product.findOne( {name: req.body.name } );

        if (exists)
            return res.status(409).json({ message: 'Product already exists' });

        const product = await Product.create(req.body);
        res.status(201).json(product);

    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
})

productRouter.delete('/:name', async (req, res) => {
    try {
        const name = req.params.name;

        if (typeof name === 'string' && name.trim().length > 0) 
            return res.status(400).json( {message: 'Missing name'} );

        const result = await Product.deleteOne({ name: name })
        if (result.deletedCount === 0) 
            return res.status(404).json( { message: 'Product not found' });
        
        return res.status(200).json({ message: 'Product deleted successfully' });
    }
    catch (error) {
        return res.status(500).json( { message: error.message } );
    }
})

module.exports = productRouter;