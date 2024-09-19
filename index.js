const express = require('express');
const mongoose = require('mongoose');
// const Product = require('./models/product.model.js');
// const validateProduct = require('./validator/product.validator.js');
// const { productToProductDto } = require('./mapping/product.mapping.js');
require('dotenv').config();
const router = require('./routes');

const app = express();

app.use(express.json());
app.use('/api', router);

app.get('/', (_req, res) => {
    res.send('Hello from Node API Server');
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