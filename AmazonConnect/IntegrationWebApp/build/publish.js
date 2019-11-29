'use strict';

var child_process = require('child_process');

// publish to output.
console.log('Publishing web libs for lake amazon connect package, please wait ......');
console.log('');

child_process.exec('build.bat', function (error, stdout, stderr) {

	if (error) {
		console.error('exec error: ', error);
		return;
	}

	console.log('stdout: ', stdout);
	console.error('stderr: ', stderr);

	// publish to output.
	console.log('');
	console.log('Publishing has completed.');
});