/*
 * This spec is only to test that the final functionality of this app still works when compressed.
 *
 * uglifyjs src/shop/Basket.js src/shop/Products.js src/shop/Receipt.js src/shop/Taxes.js src/App.js -o dist/socrata.app.min.js --source-map dist/socrata.app.min.js.map --source-map-root http://localhost/ -p 5 -c -m
 */

var app = require('../dist/socrata.app.min.js'),
	sample = require('../spec/sample-data.js');

describe('sample input and output tests', function() {

	it('sample basket #1 should calculate totals properly', function() {

		app.products.setProducts(sample);

		app.basket.clearItems();

		app.addItem('BOOK1');
		app.addItem('MUSIC1');
		app.addItem('CHOC1');

		var items = app.getItems();

		expect(items.length).toEqual(3);

		expect(items[0].finalPrice).toEqual('12.49');
		expect(items[1].finalPrice).toEqual('16.49');
		expect(items[2].finalPrice).toEqual('0.85');

		var totals = app.getTotals();

		expect(totals.tax).toEqual('1.50');
		expect(totals.total).toEqual('29.83');

	});

	it('sample basket #2 should calculate totals properly', function() {

		app.products.setProducts(sample);

		app.basket.clearItems();

		app.addItem('IMPCHOC1');
		app.addItem('IMPPERF1');

		var items = app.getItems();

		expect(items.length).toEqual(2);

		expect(items[0].finalPrice).toEqual('10.50');
		expect(items[1].finalPrice).toEqual('54.65');

		var totals = app.getTotals();

		expect(totals.tax).toEqual('7.65');
		expect(totals.total).toEqual('65.15');

	});

	it('sample basket #3 should calculate totals properly', function() {

		app.products.setProducts(sample);

		app.basket.clearItems();

		app.addItem('IMPPERF2');
		app.addItem('PERF1');
		app.addItem('PILLS1');
		app.addItem('IMPCHOC2');

		var items = app.getItems();

		expect(items.length).toEqual(4);

		expect(items[0].finalPrice).toEqual('32.19');
		expect(items[1].finalPrice).toEqual('20.89');
		expect(items[2].finalPrice).toEqual('9.75');
		expect(items[3].finalPrice).toEqual('11.85');

		var totals = app.getTotals();

		expect(totals.tax).toEqual('6.70');
		expect(totals.total).toEqual('74.68');

	});

});