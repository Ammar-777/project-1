const http = require('http');
const fs = require('fs');
const path = require('path');
const baseDir = __dirname;
const port = 8080;

function serverFile(filepath, res) {
    fs.readFile(filepath, (err, data) => {
        if (err) {
            res.writeHead(505, {'Content-Type': 'text/plain'});
            res.end('505 - Internal Server Error');
        } else  {
            res.writeHead(202, {'Content-Type': 'text/html'});
            res.end(data);
        }
    })
}

function addressNotFound (res) {
    fs.readFile(path.join(baseDir, '404.html'), (err, data) => {
        if (err) {
            res.writeHead(505, {'Content-Type': 'text/plain'});
            res.end('505 - Internal Server Error');
        } else {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end(data);
        }
    });
}
const server = http.createServer((req, res) => {

    if(req.url === '/') {
        serverFile(path.join(baseDir, 'index.html'), res);
    } else if (req.url === '/about') {
        serverFile(path.join(baseDir, 'about.html'), res);
    } else if (req.url === '/contact-me') {
        serverFile(path.join(baseDir, 'contact-me.html'), res);
    } else {
        addressNotFound(res);
    }

});

server.listen(port, ()=> {
    console.log(`The server is listening at port ${port}`);
})