/**
 * @class  Receipt
 * [Receipt description]
 * @param {Object} config A configuration object to set the initial config for this class
 */
function Receipt(config){
	this.template = (config)?config.template:undefined || '';
}

module.exports = Receipt;