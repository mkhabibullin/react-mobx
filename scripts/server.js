const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '../', 'build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'build', 'index.html'));
});

var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var ocelot = 'http://localhost:5001/api';

app.all("/api/*", function(req, res) {
  apiProxy.web(req, res, {target: ocelot});
});

https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
  passphrase: '143265398'
}, app)
.listen(80);