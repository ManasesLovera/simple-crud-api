// const Product = require('../models/product.model.js');
// const validateProduct = require('../validator/product.validator.js');
// const { productToProductDto } = require('../mapping/product.mapping.js');
const { getAll, getByName, add, remove } = require('../controller/product.controller.js');

const express = require('express');
const productRouter = express.Router();

productRouter.get('/', getAll);
productRouter.get('/:name', getByName);
productRouter.post('/', add);
productRouter.delete('/:name', remove);

module.exports = productRouter;