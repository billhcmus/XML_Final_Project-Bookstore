const app = require('http');
const url = require('url');
const query = require('querystring');
const port = 1000;

let getMethod = require('./services/getMethod');
let saveMethod = require('./services/saveMethod');

let cache = getMethod.getListBooks();

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
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log(`${req.method} ${req.url}`);

    switch(req.method) {
        case 'GET':
            switch(req.url) {
                case '/LaySach':
                    if (cache) {
                        res.writeHeader(200, {'Content-Type': 'text/xml'})
                        res.end(cache);
                    }
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
                case '/CapNhat': {
                    var body = '';
                    req.on('data', function(chunk) {
                        body += chunk;
                    })
                    req.on('end', function () {
                        var data = JSON.parse(body);
                        var check = saveMethod.changePrice(data);
                        if (check) {
                            res.writeHead(200, { 'Content-Type': 'text/plain'});
                            res.end('Cập nhật giá thành công.');
                            console.log(' -->Done');
                        }
                        else {
                            res.writeHead(404, { 'Content-Type': 'text/plain'});
                            res.end('Cập nhật thất bại');
                            console.log(' -->Fail');
                        }
                    })
                }
                break;
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