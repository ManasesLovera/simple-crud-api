

function productToProductDto(product) {
    return {
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        image: product.image
    }
}

module.exports = { productToProductDto }