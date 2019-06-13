const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const app = express();
const httpProxy = require('http-proxy');

try {
  app.use(express.static(path.join(__dirname, '../', 'build')));

  const apiProxy = httpProxy.createProxyServer();
  const ocelotBase = 'localhost:5000';
  const ocelotHttp = `http://${ocelotBase}`;
  const ocelotWs = `ws://${ocelotBase}`;
  const cert = 'C://certs/cdf3d6bb-2f8f-4a6a-af8d-db6c7509d681.pfx';

  app.all("/api/*", function(req, res) {
    apiProxy.web(req, res, {
        target: ocelotHttp,
        ws:true,
				ssl: { pfx: fs.readFileSync(cert) },
        secure: true
				});
  });
  app.all("/ws/*", function(req, res) {
    apiProxy.web(req, res, {
        target: ocelotHttp,
        ws:true,
				ssl: { pfx: fs.readFileSync(cert) },
        secure: true
				});
  });

  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../', 'build', 'index.html'));
  });

  var server = require('http').createServer(app);

  // Proxy websockets
  server.on('upgrade', function (req, socket, head) {
    apiProxy.ws(req, socket, head, { target: ocelotWs });
  });
  server.listen(80);
  

  var httpsServer = https.createServer({
    pfx: fs.readFileSync(cert),
  }, app);

  
  // Proxy websockets
  httpsServer.on('upgrade', function (req, socket, head) {
    apiProxy.ws(req, socket, head, { target: ocelotWs });
  });

  httpsServer.listen(443);

} catch(exc) {
  fs.writeFile("C://logs/react-app-server", exc, function(err) {
    if(err) {
        return console.log(err);
    }
  }); 
}