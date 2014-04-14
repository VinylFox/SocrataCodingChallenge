var app = require('./src/App.js'),
	sample = require('./spec/sample-data.js');

app.products.setProducts(sample);

// add the four products for inout #3
app.addItem('IMPPERF2');
app.addItem('PERF1');
app.addItem('PILLS1');
app.addItem('IMPCHOC2');

// collect all the data needed for the receipt and generate the receipt
var items = app.getItems(),
	totals = app.getTotals(),
	receipt = app.receipt.getReceipt(items, totals);

// print the receipt
console.log(receipt);