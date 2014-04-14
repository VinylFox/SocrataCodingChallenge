/**
 * @class  Products
 * [Products description]
 * @param {Object} config A configuration object to set the initial config for this class
 */
function Products(config) {

    this.items = (config) ? config.products : undefined || [];

}

/**
 * Retrieve a product object based on it's SKU
 * @param  {String} sku
 * @return {Object}
 */
Products.prototype.getProduct = function (sku) {

    var cnt = this.items.length,
        i = 0;
    for (; i < cnt; i++) {
        if (this.items[i].sku === sku) {
            return this.items[i];
        }
    }
    return null;

};

/**
 * Pass in an array of products that are part of the system.
 * @param {Array} items
 */
Products.prototype.setProducts = function (items) {

    this.items = items;

};

module.exports = Products;
