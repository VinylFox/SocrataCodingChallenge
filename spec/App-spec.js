var app = require("../src/App.js"),
	sample = require("../spec/sample-data.js");

// just re-import the classes here so they can be tested against
var Receipt = require('../src/shop/Receipt.js'),
	Taxes = require('../src/shop/Taxes.js'),
	Products = require('../src/shop/Products.js'),
	Basket = require('../src/shop/Basket.js');

describe("basic application setup", function() {

	it("should have receipt, taxes, product and basket classes", function() {

		expect(app.receipt instanceof Receipt).toBeTruthy();
		expect(app.taxes instanceof Taxes).toBeTruthy();
		expect(app.products instanceof Products).toBeTruthy();
		expect(app.basket instanceof Basket).toBeTruthy();

	});

});

describe("sample input and output tests", function(){

	it("sample basket #1 should calculate totals properly", function(){

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

	it("sample basket #2 should calculate totals properly", function(){

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

	it("sample basket #3 should calculate totals properly", function(){

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