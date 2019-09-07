const path = require('path');
const http = require('http');
const fs = require('fs');
const API = require('./api.js.js');

const ip = '127.0.0.1';
const port = 3002;

http.createServer((req, res) => {
    console.log('request ', req.url);
    let file = '.'+ req.url;
    // redirect / to serve index.html
    if (file == './') file = './index.html';
    // extract requested file's extension
    let extension = String(path.extname(file)).toLowerCase();
    // define acceptable file extensions
    let mime = { '.html': 'text/html',
                 '.js': 'text/javascript',
                 '.css': 'text/css',
                 '.json': 'application/json',
                 '.png': 'image/png',
                 '.jpg': 'image/jpg',
                 '.gif': 'image/gif'
                };
    // if requested file type is not mime, default 
    // to octet-stream which menas 'arbitrary binry data
    let type = mime[extension] || 'application/octet-stream';

    //read file from hard drive
    fs.readFile(file, (err, content) => {
        if (err) {
            if(err.code == 'ENOENT'){
                if (req.url == '/'){
                    req.url = '/api';
                }
             // check if this is an api call else serve error html
                if (API.catchAPIrequest(req.url)) {
                  API.exec(res);
                }
              else
                // not an api call -file just doesn't exit
                fs.readFile('./404.html', (err, content) => {
                    res.writeHead(200, 
                        {'Content-Type': type});
                    res.end(content, 'utf-8')
                });
            } else {
                res.writeHead(500);
                res.end('Error:' + err.code + '\n');
                res.end();
            }
        } else{
            res.writeHead(200, { 'Content-Type': type});
            res.end(content, 'utf-8');
        }
    })
}).listen(port, ip);

// let ext = path.extname('index.js');
// console.log(ext);
console.log('Running at http://'+ip + ':' + port + '/');
