var https = require('https');

//Liberty Controller artifacts
//Need to make these parameters for general case
var _targetHost = 'localhost';
var _targetPort = 9443;
var _passwordString = 'admin:adminpwd';

exports.simpleGET = function simpleGET(urlPath, successCallback, errorCallback) {
	var options = {
		hostname: _targetHost,
		port: _targetPort,
		path: urlPath,
		method: 'GET',
		auth: _passwordString,
		requestCert: true,
		rejectUnauthorized: false,
		agent: false
	};
	
	var req = https.request(options, function(res) {
		var data = "";
		res.on('data', function(d) {
			//console.log("got more data: " + d);
			data += d;
		});
		
		res.on('end', function() {
			//console.log("finished receiving data");
			successCallback(res,data);
		});
	});
	req.end();
	
	req.on('error', errorCallback);
}

exports.simplePOST = function simplePOST(payload, urlPath, successCallback, errorCallback) {
	var options = {
		hostname: _targetHost,
		port: _targetPort,
		path: urlPath,
		method: 'POST',
		auth: _passwordString,
		requestCert: true,
		rejectUnauthorized: false,
		agent: false,
		headers: {
          'Content-Type': 'application/json',
          'Content-Length': payload.length
      }
	};

	//console.log("CPV urlPath: "+urlPath);
	//console.log("CPV payload: "+payload);

	var req = https.request(options, function(res) {
		var data = "";
		res.on('data', function(d) {
			//console.log("got more data: " + d);
			data += d;
		});
		
		res.on('end', function() {
			//console.log("finished receiving data");
			successCallback(res,data);
		});
	});
	req.write(payload);
	req.end();
	
	req.on('error', errorCallback);
}



