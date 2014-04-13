var Basket = require("../../src/shop/Basket.js"),
	sample = require("../../spec/sample-data.js"),
	basket,
	// keeping the count of all the sample items to use in tests
	itemCount = sample.length;


beforeEach(function(){
	basket = new Basket();
});

describe("basic basket setup", function() {

	it("should have an items array", function() {
		expect(basket.items instanceof Array).toBeTruthy();
	});

});

describe("ability to set and retrieve cart items", function(){

	it("should be able to set and retrieve the entire cart", function(){
		basket.setItems(sample);
		expect(basket.getItems().length).toEqual(itemCount);
	});

});

describe("ability to add and remove items from the basket", function(){

	it("should add an item to the basket", function(){
		var item = sample[0],
			sku = item.sku;
		basket.addItem(item);
		expect(basket.getItems()[0].sku).toEqual(sku);
	});
	
})