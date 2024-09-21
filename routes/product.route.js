const { getAll, getByName, add, remove, update } = require('../controller/product.controller.js');

const express = require('express');
const productRouter = express.Router();

productRouter.get('/', getAll);
productRouter.get('/:name', getByName);
productRouter.post('/', add);
productRouter.delete('/:name', remove);
productRouter.put('/', update);

module.exports = productRouter;