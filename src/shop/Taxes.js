/**
 * @class  Taxes
 * [Taxes description]
 * @param {Object} config A configuration object to set the initial config for this class
 */
function Taxes(config) {

	// an array of product types that are not taxable
	this.nonTaxableTypes = (config) ? config.nonTaxableTypes : undefined || ['book', 'food', 'medical'];
	// tax rate defined as a percentage, ie: 10 = 10%
	this.taxRate = (config) ? config.taxRate : undefined || 10;
	this.taxRate = (this.taxRate / 100) + 1;
	// import rate defined as a percentage, ie: 5 = 5%
	this.importRate = (config) ? config.importRate : undefined || 5;
	this.importRate = (this.importRate / 100) + 1;

	this.roundTaxUp = (config) ? config.roundTaxUp : undefined || 0.05;
	this.roundTaxUp = 1 / this.roundTaxUp;

}

/**
 * Calculates the appropriate tax on an item. Adds a finalPrice and
 * totalTax property to the product object.
 * @param  {Object} item
 * @return {Object}
 */
Taxes.prototype.calculate = function(item) {

	var tax = 0,
		importTax = 0,
		totalTax = 0;

	if (this.taxRate && this.nonTaxableTypes.indexOf(item.type) == -1) {
		tax = (item.price * this.taxRate) - item.price;
	}

	if (this.importRate && item.imported) {
		importTax = (item.price * this.importRate) - item.price;
	}

	totalTax = tax + importTax;

	if (this.roundTaxUp && totalTax) {
		totalTax = (Math.ceil(totalTax * this.roundTaxUp) / this.roundTaxUp);
	}

	item.finalPrice = (item.price + totalTax).toFixed(2);
	item.totalTax = totalTax.toFixed(2);

	return item;

};

module.exports = Taxes;