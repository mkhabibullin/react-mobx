const express = require('express');
// const https = require('https');
const fs = require('fs');
const path = require('path');
const app = express();

try
{
  app.use(express.static(path.join(__dirname, '../', 'build')));

  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../', 'build', 'index.html'));
  });

  var httpProxy = require('http-proxy');
  var apiProxy = httpProxy.createProxyServer();
  var ocelot = 'http://localhost:5001/api';

  app.all("/api/*", function(req, res) {
    apiProxy.web(req, res, {target: ocelot});
  });

  // https.createServer({
  //   key: fs.readFileSync('./cert.key'),
  //   cert: fs.readFileSync('./cert.pem'),
  //   passphrase: '143265398'
  // }, app)
  app.listen(80);
} catch(exc) {
  fs.writeFile("C://tmp/test", exc, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
}