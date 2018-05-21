const app = require('http');
const url = require('url');
const query = require('querystring');
const port = 1000;


let session = [];

function checkAuth(headers) {
    let uid = headers.uid;
    for (let i = 0;i < session.length;i++) {
        if (uid === session[i]) {
            return true;
        }
    }
    return false;
}

app.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    switch(req.method) {
        case 'GET':
            let getMethod = require('./services/getMethod.js');
            switch(req.url) {
                case '/':
                    res.writeHeader(200, {'Content-Type': 'text/xml'});
                    let data = getMethod.getListBooks();
                    res.end(data);
                    break;
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

        case 'PUT':
            break;
        case 'DELETE':
            break;
    }
}).listen(port, err => {
    if (err != null) {
        console.log('==>Error: ' + err);
    }
    else {
        console.log('Server is starting at port ' + port);
    }
})