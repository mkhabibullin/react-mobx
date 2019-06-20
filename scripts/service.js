// https://github.com/coreybutler/node-windows
var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'React Mobx web app',
  description: 'The nodejs.org example web server.',
  script: require('path').join(__dirname, 'server.js'),
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ]
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();