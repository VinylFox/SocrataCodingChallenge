var util = require('util');

/**
 * @class  Receipt
 * [Receipt description]
 * @param {Object} config A configuration object to set the initial config for this class
 */
function Receipt(config) {

    var nl = "\r\n",
        defaultHeaderTemplate =
            " _______________________________________________" + nl +
            "|                                               |" + nl +
            "|     .::+                        .+            |" + nl +
            "|     :                           .+            |" + nl +
            "|     +;    +++++  ++++:+++ ++++ ++++:.++++     |" + nl +
            "|     :++, :+   +.'+   :+      '+ .+      +     |" + nl +
            "|       ;+.+;   +++,   :+   .++++ .+   '+++     |" + nl +
            "|        +++;   +++,   :+  ,+  :+ .+  +'  +     |" + nl +
            "|        +',+   +`;+   :+  ++  ++ .+  +   +     |" + nl +
            "|     ++++  '+++'  ++++,+  `+++'+  ++;+++++     |" + nl +
            "|                                               |" + nl +
            "|                               Store           |" + nl +
            "|                                               |" + nl +
            "|-----------------------------------------------|" + nl +
            "|                                               |" + nl,
        defaultItemTemplate =
            "|  %s  x  %s%s  |" + nl,
        defaultFooterTemplate =
            "|                                               |" + nl +
            "|-----------------------------------------------|" + nl +
            "|                                               |" + nl +
            "|                     Sales tax ......%s  |" + nl +
            "|                     Total ..........%s  |" + nl +
            "|                                               |" + nl +
            "|      Thanks for shopping with Socrata!        |" + nl +
            "|_______________________________________________|";

    this.headerTemplate = (config) ? config.headerTemplate : undefined || defaultHeaderTemplate;
    this.itemTemplate = (config) ? config.itemTemplate : undefined || defaultItemTemplate;
    this.footerTemplate = (config) ? config.footerTemplate : undefined || defaultFooterTemplate;
    this.nl = nl;

}

/**
 * Retrieve a receipt based on the items and totals.
 * @param  {Array} items An array of product objects with a name, imported and finalPrice property.
 * @param  {Object} totals An Object with a tax and total property.
 * @return {String} The receipt string.
 */
Receipt.prototype.getReceipt = function (items, totals) {

    var receipt = this.headerTemplate,
        cnt = items.length,
        i = 0;

    for (; i < cnt; i++) {
        receipt += util.format(this.itemTemplate, 1, this.formatName(items[i].name, items[i].imported), this.formatMoney(items[i].finalPrice));
    }

    receipt += util.format(this.footerTemplate, this.formatMoney(totals.tax), this.formatMoney(totals.total));

    return receipt;

};

/**
 * Formats money values with a dollar sign and padded so the cents line up.
 * Keeping this simple for now, formatted money can be no more than 999.99.
 * @param  {String} amt The dollar ammount string with two decimals.
 * @return {String} The formatted value with a dollar sign and padding added.
 */
Receipt.prototype.formatMoney = function (amt) {

    return this.repeatChars(" ", (6 - amt.length)) + "$" + amt;

};

/**
 * Formats the product name to be left aligned and padded on the right with dots.
 * Will add an imported indicator if the imported argument is true.
 * @param  {String} name The name of the product.
 * @param  {Boolean} imported Will add an imported indicator if true.
 * @return {String}
 */
Receipt.prototype.formatName = function (name, imported) {

    name = (imported) ? name + " (imported)" : name;

    return name + this.repeatChars(".", (28 - name.length));

};

/**
 * Given a character and count will repeat the characted cnt number of times and
 * return the resulting string.
 * @param  {String} chr The character to repeat.
 * @param  {Integer} cnt How many times to repeat the character.
 * @return {String}
 */
Receipt.prototype.repeatChars = function (chr, cnt) {

    var str = chr,
        i = 0;

    for (; i < cnt; i++) {
        str += chr;
    }

    return str;

};

module.exports = Receipt;
