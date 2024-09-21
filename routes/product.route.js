const { getAll, getByName, add, remove } = require('../controller/product.controller.js');

const express = require('express');
const productRouter = express.Router();

productRouter.get('/', getAll);
productRouter.get('/:name', getByName);
productRouter.post('/', add);
productRouter.delete('/:name', remove);

module.exports = productRouter;