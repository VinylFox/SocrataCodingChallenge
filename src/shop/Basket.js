/**
 * @class Basket
 * This class is responsible for maintaining a basket of 
 * products the customer has added.
 * @param {Object} config A configuration object to set the initial config for this class
 */
function Basket(config){

	this.items = (config)?config.items:undefined || [];

}

/**
 * Retrieve all items in the basket.
 * @return {Array}
 */
Basket.prototype.getItems = function(){

	return this.items;

};

/**
 * Use to add items to the cart in a bulk manner.
 * @param {Array} items
 */
Basket.prototype.setItems = function(items){

	this.items = items;

};

/**
 * Remove all of the items in the basket.
 */
Basket.prototype.clearItems = function(){

	this.items = [];

};

/**
 * Add items to the basket
 * @param {Object} item An object representing the details of a product. 
 * Use the getProduct method on the Products class to retrieve products 
 * by their SKU.
 */
Basket.prototype.addItem = function(item){

	this.items.push(item);
	
};

module.exports = Basket;