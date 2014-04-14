var app = require('../src/App.js'),
	sample = require('../spec/sample-data.js');

app.products.setProducts(sample);

// add the both products for inout #2
app.addItem('IMPCHOC1');
app.addItem('IMPPERF1');

// collect all the data needed for the receipt and generate the receipt
var items = app.getItems(),
	totals = app.getTotals(),
	receipt = app.receipt.getReceipt(items, totals);

// print the receipt
console.log(receipt);