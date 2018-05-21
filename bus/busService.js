const app = require('http');
const url = require('url');
const query = require('querystring');
const xml2js = require('xml2js');

const axios = require('axios');

const port = 1001;

app.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    switch(req.method) {
        case 'GET':
            switch(req.url) {
                default:
                    res.writeHeader(404, {'Content-Type': 'text/plain'});
                    res.end("Request was not support!!!");
                    break;
            }
            console.log('-->Done');
            break;
        case 'POST':
            switch(req.url) {
                default:
                    res.writeHeader(404, {'Content-Type': 'text/plain'})
                    res.end("Request was not support!!!")
                    break
            }
    }
}).listen(port, err => {
    if (err != null) {
        console.log('==> Error: ', err);
    }
    else {
        console.log('Server is starting at port ' + port);
    }
});
   
let listBooks; 
