function validateProduct(product) {

    let errors = [];

    if (!product.name)
        errors.push('Name is mising')
    if (product.quantity === undefined)
        errors.push('Quantity is missing')
    else if (isNaN(parseInt(product.quantity)))
        errors.push('Quantity is not a number')
    if (product.price === undefined)
        errors.push('Price is missing')
    else if (isNaN(parseFloat(product.price)))
        errors.push('Price is not a number')
    if (product.image === undefined)
        errors.push('Image is missing')
    else if (typeof product.image !== 'string' && product.image !== null)
        errors.push('Image is not valid, must be a string or null')

    return {
        isValid: errors.length === 0,
        errors: errors
    }
}

module.exports = validateProduct;