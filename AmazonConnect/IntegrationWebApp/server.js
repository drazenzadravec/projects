'use strict';
var http = require('http');
var port = process.env.PORT || 1337;
const fs = require('fs');

http.createServer(function (req, res) {

	if (req.url.startsWith("/index.html")) {
		fs.readFile('index.html', function (err, data) {
			res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': data.length });
			res.write(data);
			res.end();
		});
    }
    else if (req.url.startsWith("/client.html")) {
        fs.readFile('client.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': data.length });
            res.write(data);
            res.end();
        });
	}
	else if (req.url.startsWith("/customer.html")) {
		fs.readFile('customer.html', function (err, data) {
			res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': data.length });
			res.write(data);
			res.end();
		});
	}
	else if (req.url.startsWith("/integratedchat.html")) {
		fs.readFile('integratedchat.html', function (err, data) {
			res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': data.length });
			res.write(data);
			res.end();
		});
	}
	else if (req.url.startsWith("/embeddedchat.html")) {
		fs.readFile('embeddedchat.html', function (err, data) {
			res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': data.length });
			res.write(data);
			res.end();
		});
	}
    else if (req.url.startsWith("/lib/connect-streams.js")) {
        fs.readFile('./lib/connect-streams.js', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/javascript', 'Content-Length': data.length });
            res.write(data);
            res.end();
        });
    }
    else if (req.url.startsWith("/lib/connect-streams-min.js")) {
        fs.readFile('./lib/connect-streams-min.js', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/javascript', 'Content-Length': data.length });
            res.write(data);
            res.end();
        });
    }
	else if (req.url.startsWith("/lib/amazon-connect.min.js")) {
		fs.readFile('./lib/amazon-connect.min.js', function (err, data) {
			res.writeHead(200, { 'Content-Type': 'text/javascript', 'Content-Length': data.length });
			res.write(data);
			res.end();
		});
    }
    else if (req.url.startsWith("/lib/amazon-connect-chat-interface.js")) {
        fs.readFile('./lib/amazon-connect-chat-interface.js', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/javascript', 'Content-Length': data.length });
            res.write(data);
            res.end();
        });
    }
	else if (req.url.startsWith("/js/lake-js-ui.bundle.js")) {
		fs.readFile('./js/lake-js-ui.bundle.js', function (err, data) {
			res.writeHead(200, { 'Content-Type': 'text/javascript', 'Content-Length': data.length });
			res.write(data);
			res.end();
		});
	}
	else if (req.url.startsWith("/js/embeddedchat.js")) {
		fs.readFile('./js/embeddedchat.js', function (err, data) {
			res.writeHead(200, { 'Content-Type': 'text/javascript', 'Content-Length': data.length });
			res.write(data);
			res.end();
		});
	}
	else if (req.url.startsWith("/main.css")) {
		fs.readFile('main.css', function (err, data) {
			res.writeHead(200, { 'Content-Type': 'text/css', 'Content-Length': data.length });
			res.write(data);
			res.end();
		});
	}
    else if (req.url.startsWith("/style.css")) {
        fs.readFile('style.css', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/css', 'Content-Length': data.length });
            res.write(data);
            res.end();
        });
    }
	else if (req.url.startsWith("/css/lake-css-ui.bundle.css")) {
		fs.readFile('./css/lake-css-ui.bundle.css', function (err, data) {
			res.writeHead(200, { 'Content-Type': 'text/css', 'Content-Length': data.length });
			res.write(data);
			res.end();
		});
	}
	else if (req.url.startsWith("/image/live-chat.png")) {
		fs.readFile('./image/live-chat.png', function (err, data) {
			res.writeHead(200, { 'Content-Type': 'image/png', 'Content-Length': data.length });
			res.write(data);
			res.end();
		});
	}
	else {
		if (req.url.startsWith("/")) {
			fs.readFile('embeddedchat.html', function (err, data) {
				res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': data.length });
				res.write(data);
				res.end();
			});
		}
	}

}).listen(port);
