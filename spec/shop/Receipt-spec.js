var Receipt = require('../../src/shop/Receipt.js'),
	sample = require('../../spec/sample-data.js'),
	receipt,
	// keeping the count of all the sample items to use in tests
	itemCount = sample.length;

beforeEach(function() {
	receipt = new Receipt();
});

describe('basic receipt setup', function() {

	it('should have default templates', function() {

		expect(receipt.headerTemplate).not.toBe(undefined);
		expect(receipt.itemTemplate).not.toBe(undefined);
		expect(receipt.footerTemplate).not.toBe(undefined);

	});

});

describe('formatting functions work as expected', function() {

	it('should be able to pad a name and add imported indication', function() {

		expect(receipt.formatName('Test', false)).toEqual('Test.........................');
		// this one tests the imported indicator functionality
		expect(receipt.formatName('Test', true)).toEqual('Test (imported)..............');

	});

	it('should format prices properly', function() {

		// keeping it simple, formatted money can be no more than 999.99
		expect(receipt.formatMoney('100.50')).toEqual(' $100.50');
		expect(receipt.formatMoney('10.50')).toEqual('  $10.50');
		expect(receipt.formatMoney('1.50')).toEqual('   $1.50');

	});

});