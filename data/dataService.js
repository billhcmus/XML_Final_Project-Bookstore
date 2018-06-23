const app = require('http');
const url = require('url');
const port = 1000;

let getMethod = require('./services/getMethod');
let saveMethod = require('./services/saveMethod');

let cache_ListBooks = "";
let cache_Account = "";

function createSession() {
    return '_' + Math.random().toString(36);
}

function checkAuth(headers) {
    let uid = headers.uid;
    for (let i = 0; i < session.length; i++) {
        if (uid === session[i]) {
            return true;
        }
    }
    return false;
}

function checkAccount(listAccount, username, password) {
    let length = listAccount.length;
    let user, passw, name, position, cmnd, address;
    let obj;
    for (let i = 0; i < length; i++) {
        user = listAccount[i].getAttribute('Username');
        passw = listAccount[i].getAttribute('Password');
        if (user === username && passw === password) {
            name = listAccount[i].getAttribute('Ho_ten');
            position = listAccount[i].getAttribute('Chuc_vu');
            cmnd = listAccount[i].getAttribute('Cmnd');
            address = listAccount[i].getAttribute('Dia_chi');
            obj = {
                name,
                position,
                cmnd,
                address
            }
            break;
        }
    }
    return obj;
}

app.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log(`${req.method} ${req.url}`);

    switch (req.method) {
        case 'GET':
            switch (req.url) {
                case '/LaySach':
                    if (!cache_ListBooks) {
                        cache_ListBooks = getMethod.getListBooks();
                    }
                    res.writeHeader(200, { 'Content-Type': 'text/xml' })
                    res.end(cache_ListBooks);
                    break;
                default:
                    res.writeHeader(404, { 'Content-Type': 'text/plain' });
                    res.end("Request was not support!!!");
                    break;
            }
            console.log('-->Done');
            break;

        case 'POST':
            switch (req.url) {
                case '/CapNhatGiaBan': {
                    var body = '';
                    req.on('data', function (chunk) {
                        body += chunk;
                    })
                    req.on('end', function () {
                        var data = JSON.parse(body);
                        var check = saveMethod.changePrice(data);
                        if (check) {
                            res.writeHead(200, { 'Content-Type': 'text/plain' });
                            res.end('Cập nhật giá thành công.');
                            cache_ListBooks = "";
                            console.log(' -->Done');
                        }
                        else {
                            res.writeHead(404, { 'Content-Type': 'text/plain' });
                            res.end('Cập nhật thất bại');
                            console.log(' -->Fail');
                        }
                    })
                }
                    break;
                case '/CapNhatTinhTrang': {
                    var body = '';
                    req.on('data', function (chunk) {
                        body += chunk;
                    })
                    req.on('end', function () {
                        var data = JSON.parse(body);
                        var check = saveMethod.changeStatus(data);
                        if (check) {
                            res.writeHead(200, { 'Content-Type': 'text/plain' });
                            res.end('Cập nhật giá thành công.');
                            cache_ListBooks = "";
                            console.log(' -->Done');
                        }
                        else {
                            res.writeHead(404, { 'Content-Type': 'text/plain' });
                            res.end('Cập nhật thất bại');
                            console.log(' -->Fail');
                        }
                    })
                }
                    break;
                case '/Login': {
                    var body = '';
                    req.on('data', function(chunk) {
                        body += chunk;
                    });

                    req.on('end', function() {
                        let data = JSON.parse(body);
                        let isLogin = false, session = '';

                        if (!cache_Account)
                            cache_Account = getMethod.getAccount();
    
                        var account = checkAccount(cache_Account, data.username, data.password);
                        if (account) {
                            isLogin = true;
                            session = createSession();
                            
                        }
                        var obj = {
                            session,
                            account,
                            isLogin
                        }
                        res.writeHead(200, { 'Content-Type': 'text/plain' });
                        res.end(JSON.stringify(obj));
                        console.log(' -->Done');
                    })
                }
                    break;
                default:
                    res.writeHeader(404, { 'Content-Type': 'text/plain' })
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