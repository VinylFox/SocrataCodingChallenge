var Receipt = require('../src/shop/Receipt.js'),
	Taxes = require('../src/shop/Taxes.js'),
	Products = require('../src/shop/Products.js'),
	Basket = require('../src/shop/Basket.js');

/**
 * @class  App
 * This is the main application class that combines all the functionality
 * from sub classes into one place.
 * @param {Object} config A configuration object to set the initial config for this class
 */
function App(config) {
	// apply any properties passed into the constructor to this instance
	for (var prop in config) this[prop] = config[prop];
	// tax rounding amount defined as a float, ie: 0.05 = round to nearest 5 cents
	this.roundTax = (config) ? config.roundTax : undefined || 0.05;
	// create a local instance of the Receipt class
	this.receipt = this.receipt || new Receipt();
	// create a local instance of the Taxes class
	this.taxes = this.taxes || new Taxes();
	// create a local instance of the Products class
	this.products = this.products || new Products();
	// create a local instance of the Basket class
	this.basket = this.basket || new Basket();
}

/**
 * Convenience method to add an item to the basket using just the SKU
 * @param {String} sku
 */
App.prototype.addItem = function(sku) {
	var item = this.products.getProduct(sku);
	this.basket.addItem(item);
};

/**
 * Retrieve all of the items in the basket, including their taxes
 * @return {Array}
 */
App.prototype.getItems = function() {

	var items = this.basket.getItems(),
		cnt = items.length,
		outputItems = [],
		i = 0;
	for (; i < cnt; i++) {
		outputItems.push(this.taxes.calculate(items[i]));
	}
	return outputItems;

};

/**
 * Get the totals for the current items in your basket. The returned
 * object has a total and tax property.
 * @return {Object}
 */
App.prototype.getTotals = function() {

	var items = this.basket.getItems(),
		cnt = items.length,
		outputObject = {
			total: 0,
			tax: 0
		},
		i = 0,
		curItem;
	for (; i < cnt; i++) {
		curItem = this.taxes.calculate(items[i]);
		outputObject.total += parseFloat(curItem.finalPrice);
		outputObject.tax += parseFloat(curItem.totalTax);
	}

	outputObject.total = outputObject.total.toFixed(2);
	outputObject.tax = outputObject.tax.toFixed(2);

	return outputObject;

};

App.prototype.getReceipt = function(items, totals) {

	return this.receipt.getReceipt(items, totals);

};

module.exports = new App();