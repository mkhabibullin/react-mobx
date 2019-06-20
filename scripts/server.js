process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const app = express();
const httpProxy = require('http-proxy');
const config = require('config');

try {

  app.use(express.static(path.join(__dirname, '../', 'build')));

  const apiProxy = httpProxy.createProxyServer();
  const ocelotBase = config.get('Ocelot.BaseUrl');
  const ocelotHttp = `http://${ocelotBase}`;
  const ocelotWs = `ws://${ocelotBase}`;
  const cert = config.get('CertPath');
  console.log('config: ', config);
  console.log('ENV: ', process.env.NODE_ENV);
  
  fs.writeFile(config.get('LogPath'), config, function(err) {
    if(err) {
        return console.log(err);
    }
  });

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

  let httpServer;

  if (process.env.NODE_ENV === 'production') {    
    // set up a route to redirect http to https
    httpServer = http.createServer(function (req, res) {
      res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
      res.end();
    });
  } else {
    httpServer = http.createServer(app);
    // Proxy websockets
    httpServer.on('upgrade', function (req, socket, head) {
      apiProxy.ws(req, socket, head, { target: ocelotWs });
    });
  }
  httpServer.listen(80);
  

  const httpsServer = https.createServer({
    pfx: fs.readFileSync(cert),
  }, app);

  
  // Proxy websockets
  httpsServer.on('upgrade', function (req, socket, head) {
    apiProxy.ws(req, socket, head, { target: ocelotWs });
  });

  httpsServer.listen(443);

} catch(exc) {
  fs.writeFile(config.get('LogPath'), exc, function(err) {
    if(err) {
        return console.log(err);
    }
  });
}