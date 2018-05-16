const app = require('http');
const url = require('url');
const query = require('querystring');

const port = 1001;

app.createServer((req, res) => {
    console.log(`${req.method} ${res.url}`);
}).listen(port, err => {
    if (err != null) {
        console.log('==> Error: ', err);
    }
    else {
        console.log('Server is starting at port ' + port);
    }
});