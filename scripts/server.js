const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const app = express();
const httpProxy = require('http-proxy');

try {
  app.use(express.static(path.join(__dirname, '../', 'build')));

  const apiProxy = httpProxy.createProxyServer();
  const ocelot = 'https://localhost:5001';
  const cert = 'C://certs/cdf3d6bb-2f8f-4a6a-af8d-db6c7509d681.pfx';

  app.all("/api/*", function(req, res) {
    apiProxy.web(req, res, {
				target: ocelot,
				ssl: { pfx: fs.readFileSync(cert) },
				secure: true
				});
  });

  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../', 'build', 'index.html'));
  });

 https.createServer({
     pfx: fs.readFileSync(cert),
  }, app)
  .listen(443);
  
  app.listen(80);

} catch(exc) {
  fs.writeFile("C://logs/react-app-server", exc, function(err) {
    if(err) {
        return console.log(err);
    }
  }); 
}