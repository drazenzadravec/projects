// Build the SDK.
const fs = require('fs');

/*
* replace a lot of stuff
*/
fs.readFile('AmazonConnect.js', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	var result = data.replace("\"use strict\";", '');
	var result1 = result.replace("Object.defineProperty(exports, \"__esModule\", { value: true });", '');
	
	var result2 = result1.replace("exports.AmazonConnect = AmazonConnect;", '');
	var result3 = result2.replace("exports.AmazonConnectContact = AmazonConnectContact;", '');

	fs.writeFile('AmazonConnect.bundle.js', result3, 'utf8', function (err) {
		if (err) return console.log(err);
	});
});
