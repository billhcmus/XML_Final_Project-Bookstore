const app = require('http');
const url = require('url');
const request = require('request');
const nodemailer = require('nodemailer')

const port = 1001;
let cache = "";
let listSessions = [];




function checkSession(session) {
    let length = listSessions.length;
    for (let i = 0; i < length; i++) {
        if (session === listSessions[i].session)
            return i;
    }
    return -1;
}

function deleteSession(session) {
    let check = checkSession(session);
    if (check !== -1) {
        listSessions.splice(check, 1);
    }
}

app.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log(`${req.method} ${req.url}`);
    switch (req.method) {
        case 'GET':
            switch (req.url) {
                case '/LaySach': {
                    request.get('http://localhost:1000/LaySach', function (error, respone, body) {
                        if (error) {
                            console.log('ERROR: Không lấy được danh sách sách');
                            res.writeHeader(404, { 'Content-Type': 'text/plain' });
                            res.end("Error 404");
                        }
                        else {
                            if (!cache) {
                                cache = body;
                                res.writeHeader(200, { 'Content-Type': 'text/xml' })
                                res.end(cache);
                            }
                            else {
                                res.end(cache);
                            }
                        }
                    });
                }
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

                    //Nhận dữ liệu
                    req.on('data', function (chunk) {
                        body += chunk;
                    });

                    //Gửi dữ liệu
                    req.on('end', function () {
                        let data = JSON.parse(body);
                        let session = data.session;
                        if (checkSession(session) != -1) {
                            request.post({
                                headers: {
                                    'Content-Type': 'text/plain',
                                    'Access-Control-Allow-Origin': '*'
                                },
                                url: 'http://localhost:1000/CapNhatGiaBan',
                                body
                            }, function (error, response, body) {
                                if (error) {
                                    console.log('ERROR: Không lấy cập nhật danh sách sách');
                                    res.writeHeader(404, { 'Content-Type': 'text/plain' });
                                    res.end("Error 404");
                                }
                                else {
                                    res.writeHeader(200, { 'Content-Type': 'text/plain' });
                                    res.end(body);
                                    cache = "";
                                    console.log('-->Done');
                                }
                            })
                        }
                        else {
                            res.writeHead(404, { 'Content-Type': 'text/plain;charset=utf-8' });
                            res.end('Vui lòng đăng nhập lại');
                        }
                    });

                    //Bắt lỗi request
                    req.on('error', function () {
                        res.writeHeader(404, { 'Content-Type': 'text/plain' });
                        res.end("Error 404");
                    })

                }
                    break;
                case '/CapNhatTinhTrang': {
                    var body = '';
                    req.on('data', function (chunk) {
                        body += chunk;
                    });

                    req.on('end', function () {
                        let data = JSON.parse(body);
                        let session = data.session;
                        if (checkSession(session) != -1) {
                            request.post({
                                headers: {
                                    'Content-Type': 'text/plain',
                                    'Access-Control-Allow-Origin': '*'
                                },
                                url: 'http://localhost:1000/CapNhatTinhTrang',
                                body
                            }, function (error, response, body) {
                                if (error) {
                                    console.log('ERROR: Không lấy cập nhật danh sách sách');
                                    res.writeHeader(404, { 'Content-Type': 'text/plain' });
                                    res.end("Error 404");
                                }
                                else {
                                    res.writeHeader(200, { 'Content-Type': 'text/plain' });
                                    res.end(body);
                                    cache = "";
                                    console.log('-->Done');
                                }
                            })
                        }
                        else {
                            res.writeHead(404, { 'Content-Type': 'text/plain;charset=utf-8' });
                            res.end('Vui lòng đăng nhập lại');
                        }

                    });

                    //Bắt lỗi request
                    req.on('error', function () {
                        res.writeHeader(404, { 'Content-Type': 'text/plain' });
                        res.end("Error 404");
                    })
                }
                    break;
                case '/Login': {
                    var body = '';
                    req.on('data', function (chunk) {
                        body += chunk;
                    });
                    req.on('end', function () {
                        request.post({
                            headers: {
                                'Content-Type': 'text/plain',
                                'Access-Control-Allow-Origin': '*'
                            },
                            url: 'http://localhost:1000/Login',
                            body
                        }, function (error, response, body) {
                            if (error) {
                                res.writeHeader(404, { 'Content-Type': 'text/plain' });
                                res.end(body);
                                console.log('ERROR: Không trả về tài khoản');
                            }
                            else {
                                if (response.statusCode === 200) {
                                    res.writeHeader(200, { 'Content-Type': 'text/plain' });
                                    let data = JSON.parse(body);
                                    if (data.session) {
                                        listSessions.push(data);
                                    }
                                    res.end(body);
                                    console.log(' -->Done');
                                }
                                else {
                                    console.log(body);
                                    res.writeHeader(404, { 'Content-Type': 'text/plain' });
                                    res.end(body);
                                }

                            }
                        });

                    })

                    //Bắt lỗi request
                    req.on('error', function () {
                        res.writeHeader(404, { 'Content-Type': 'text/plain' });
                        res.end("Error 404");
                    })
                }
                    break;
                case '/Logout': {
                    var session = '';
                    req.on('data', function (chunk) {
                        session += chunk;
                    });
                    req.on('end', function () {
                        deleteSession(session);
                        res.writeHead(200, {
                            'Content-Type': 'text/plain'
                        });
                        res.end("OK");
                    })
                }
                    break;
                case '/Contact': {
                    var body = '';
                    req.on('data', function (chunk) {
                        body += chunk;
                    });
                    req.on('end', function () {
                        var data = JSON.parse(body);

                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: 'thoaihuynhtrong@gmail.com',
                                pass: 'thoaideptrai'
                            }
                        });

                        var mailOptions = {
                            from: data.email,
                            to: 'thoaihuynhtrong@gmail.com',
                            subject: 'XML_Final___' + data.email + '___' + data.name,
                            text: data.message
                        };

                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                res.writeHeader(404, { 'Content-Type': 'text/plain' });
                                res.end("Error 404");
                            } else {
                                res.writeHeader(200, { 'Content-Type': 'text/plain' });
                                res.end("Success");
                            }
                        });

                    });
                }
                    break;
                default:
                    res.writeHeader(404, { 'Content-Type': 'text/plain' })
                    res.end("Request was not support!!!")
                    break;
            }
    }

}).listen(port, err => {
    if (err != null) {
        console.log('==> Error: ', err);
    } else {
        console.log('Server is starting at port ' + port);
    }
})

