const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const validateProduct = require('./validator/product.validator.js');
const { productToProductDto } = require('./mapping/product.mapping.js');
// const dotenv = require('dotenv');

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
    res.send('Hello from Node API Server');
})

app.get('/api/product', async (_req, res) => {
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

app.get('/api/product/:name', async (req, res) => {
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

app.post('/api/product', async (req, res) => {
    
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

app.delete('/api/product/:name', async (req, res) => {
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

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})

mongoose.connect('mongodb://127.0.0.1:27017/mydb')
.then( () => {
    console.log("Connected to database");
})
.catch((error) => {
    console.log("Connection failed! ",error)
})