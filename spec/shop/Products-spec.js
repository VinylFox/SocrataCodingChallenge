var Products = require('../../src/shop/Products.js'),
	sample = require('../../spec/sample-data.js'),
	products,
	// keeping the count of all the sample items to use in tests
	itemCount = sample.length;

beforeEach(function() {
	products = new Products();
	products.setProducts(sample);
});

describe('basic product setup', function() {

	it('should have an items array', function() {

		expect(products.items instanceof Array).toBeTruthy();

	});

});

describe('ability to retrieve products', function() {

	it('should be able to retrieve assorted products', function() {

		expect(products.getProduct('BOOK1').sku).toEqual('BOOK1');
		expect(products.getProduct('MUSIC1').sku).toEqual('MUSIC1');

	});

	it('should return null if product is not found', function() {

		expect(products.getProduct('XXXX')).toEqual(null);

	});

});