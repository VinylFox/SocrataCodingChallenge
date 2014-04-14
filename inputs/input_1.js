var app = require('../src/App.js'),
	sample = require('../spec/sample-data.js');

app.products.setProducts(sample);

// add the three products for inout #1
app.addItem('BOOK1');
app.addItem('MUSIC1');
app.addItem('CHOC1');

// collect all the data needed for the receipt and generate the receipt
var items = app.getItems(),
	totals = app.getTotals(),
	receipt = app.receipt.getReceipt(items, totals);

// print the receipt
console.log(receipt);