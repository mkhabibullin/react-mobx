const path = require('path');
const fs = require('fs');
const http = require('http');

var post_options = {
    host: 'logger.mysite.co.uk',
    path: '/',
    port: 80,
    timeout: 120000,
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

const directoryPath = path.join(__dirname, '../build/static/js/');

var request = require('request');
const readSourceMaps = function() {
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        files.forEach(function (file) {
            if(/.js.map$/i.test(file) && file.indexOf('main.') >= 0 && file.indexOf('runtime~main') < 0) {
                var filepath = path.join(directoryPath, file);
                var bundlePath = 'http://localhost/static/js/' + file;
                console.log('filepath: ', filepath);
                console.log('bundlePath: ', bundlePath);
                var formData = {
                    sourcemap: fs.createReadStream(filepath),
                    service_version: '1', // Or use 'git-rev-sync' for git commit hash
                    bundle_filepath: bundlePath,
                    service_name: 'react app - test'
                };
                request.post({url: 'http://localhost:8200/assets/v1/sourcemaps',formData: formData}, function (err, resp, body) {
                if (err) {
                    console.log('Error while uploading sourcemaps!', err)
                } else {
                    console.log('Sourcemaps uploaded!')
                }
                })
            }
        });
    });
}

readSourceMaps();