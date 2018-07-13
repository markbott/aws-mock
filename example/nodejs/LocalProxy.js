/*
This script runs a reverse proxy on http://localhost:9090/ to the actual backend http://localhost:8000/aws-mock/ec2-endpoint/
*/

'use strict';

var http = require('http'),
    httpProxy = require('http-proxy'),
    httpProxyRules = require('http-proxy-rules');

var proxyRules = new httpProxyRules({
    rules: {
      '.*': 'http://192.168.92.1:8002/aws-mock/ec2-endpoint/'
    }
});

// Create reverse proxy instance
var proxy = httpProxy.createProxy();

// Create http server that leverages reverse proxy instance
// and proxy rules to proxy requests to different targets
http.createServer(function(req, res) {

    // a match method is exposed on the proxy rules instance
    // to test a request to see if it matches against one of the specified rules
    var target = proxyRules.match(req);
    if (target) {
       return proxy.web(req, res, {
        target: target
      });
    }

    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('The request url and path did not match any of the listed rules!');
}).listen(9090, function(err,data) {
    if(!err) console.log("Proxy running on http://localhost:9090/");
    else console.log("Error: " + err);
});

