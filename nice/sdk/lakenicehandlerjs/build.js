// Build the SDK.
const browserify = require('browserify');
const fs = require('fs');
const request = require('request');
const uglify = require('uglify-js');

const bundle = browserify({ standalone: 'LakeNiceHandler' });
bundle.add('./base/lakenice-handler.js');
bundle.bundle(function (err, source) {
	if (err) {
		console.error(err);
	}
	fs.writeFileSync('out/lakenice-handler.bundle.js', source);

	/*
	* replace 'exports.LakeNiceHandler = LakeNiceHandler;' with 'module.exports = LakeNiceHandler;'
	*/
	fs.readFile('out/lakenice-handler.bundle.js', 'utf8', function (err, data) {
		if (err) {
			return console.log(err);
		}
		var result = data.replace('exports.LakeNiceHandler = LakeNiceHandler;', 'module.exports = LakeNiceHandler;');
		//console.log(result);

		fs.writeFile('out/lakenice-handler.bundle.js', result, 'utf8', function (err) {
			if (err) return console.log(err);
		});
	});
});
