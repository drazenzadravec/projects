// Build the SDK.
const browserify = require('browserify');
const fs = require('fs');
const request = require('request');
const uglify = require('uglify-js');

const bundle = browserify({ standalone: 'LakeNiceClient' });
bundle.add('./base/lakenice-client.js');
bundle.bundle(function (err, source) {
	if (err) {
		console.error(err);
	}
	fs.writeFileSync('out/lakenice-client.bundle.js', source);

	/*
	* replace 'exports.LakeNiceClient = LakeNiceClient;' with 'module.exports = LakeNiceClient;'
	*/
	fs.readFile('out/lakenice-client.bundle.js', 'utf8', function (err, data) {
		if (err) {
			return console.log(err);
		}
		var result = data.replace('exports.LakeNiceClient = LakeNiceClient;', 'module.exports = LakeNiceClient;');
		//console.log(result);

		fs.writeFile('out/lakenice-client.bundle.js', result, 'utf8', function (err) {
			if (err) return console.log(err);
		});
	});
});

const bundleAuth = browserify({ standalone: 'LakeNiceAuthClient' });
bundleAuth.add('./base/lakenice-auth-client.js');
bundleAuth.bundle(function (err, source) {
	if (err) {
		console.error(err);
	}
	fs.writeFileSync('out/lakenice-auth-client.bundle.js', source);

	/*
	* replace 'exports.LakeNiceAuthClient = LakeNiceAuthClient;' with 'module.exports = LakeNiceAuthClient;'
	*/
	fs.readFile('out/lakenice-auth-client.bundle.js', 'utf8', function (err, data) {
		if (err) {
			return console.log(err);
		}
		var result = data.replace('exports.LakeNiceAuthClient = LakeNiceAuthClient;', 'module.exports = LakeNiceAuthClient;');
		//console.log(result);

		fs.writeFile('out/lakenice-auth-client.bundle.js', result, 'utf8', function (err) {
			if (err) return console.log(err);
		});
	});
});
