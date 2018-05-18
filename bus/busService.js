const app = require('http');
const url = require('url');
const query = require('querystring');
const axios = require('axios');
const XMLHttpRequest = require('xhr2');

const port = 1001;

app.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    readListBooks();
}).listen(port, err => {
    if (err != null) {
        console.log('==> Error: ', err);
    }
    else {
        console.log('Server is starting at port ' + port);
    }
});

function readListBooks() {
    axios.get('http://localhost:1000/')
        .then(function(res) {
            console.log(res);
        })
        .catch(function(err) {
            console.log(err);
        })
}