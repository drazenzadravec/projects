const minify = require('minify');
const minifyhtml = require('html-minifier').minify;
const fs = require('fs');

// minify compress and obfuscate.
minify('../base/AmazonConnect.bundle.js')
	.then(function (data) {
		fs.writeFile('../base/AmazonConnect.bundle.min.o.js', data, 'utf8', function (err) {
			if (err) return console.log(err);
		});
	}).catch(console.error);

// minify compress and obfuscate.
minify('../base/amazonconnectapi.js')
	.then(function (data) {
		fs.writeFile('../base/amazonconnectapi.min.o.js', data, 'utf8', function (err) {
			if (err) return console.log(err);
		});
	}).catch(console.error);

// minify compress and obfuscate.
minify('../js/lake-js-ui.bundle.js')
	.then(function (data) {
		fs.writeFile('../js/lake-js-ui.bundle.min.o.js', data, 'utf8', function (err) {
			if (err) return console.log(err);
		});
	}).catch(console.error);

// minify compress and obfuscate.
minify('../js/app.js')
	.then(function (data) {
		fs.writeFile('../js/app.min.o.js', data, 'utf8', function (err) {
			if (err) return console.log(err);
		});
	}).catch(console.error);

// minify compress and obfuscate.
minify('../lib/amazon-connect.js')
	.then(function (data) {
		fs.writeFile('../lib/amazon-connect.min.js', data, 'utf8', function (err) {
			if (err) return console.log(err);
		});
	}).catch(console.error);

// minify compress and obfuscate.
fs.readFile('../css/lake-css-ui.bundle.css', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}

	// minify compress and obfuscate.
	var result = minifyhtml(data, { collapseWhitespace: true, minifyCSS: true, minifyJS: true, minifyURLs: true });

	fs.writeFile('../css/lake-css-ui.bundle.min.o.css', result, 'utf8', function (err) {
		if (err) return console.log(err);
	});
});