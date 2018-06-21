const app = require('http');
const url = require('url');
const request = require('request');

const port = 1001;
let cache = "";


app.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log(`${req.method} ${req.url}`);

    switch (req.method) {
        case 'GET':
            switch (req.url) {
                case '/LaySach': {
                    request.get('http://localhost:1000/LaySach', function(error, respone, body) {
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
                    })  
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
                case '/CapNhatGiaBan' : {
                    var body = '';

                    //Nhận dữ liệu
                    req.on('data', function(chunk) {
                        body += chunk;
                    });
                    
                    //Gửi dữ liệu
                    req.on('end', function() {
                        request.post({
                            headers: {
                                'Content-Type': 'text/plain',
                                'Access-Control-Allow-Origin': '*'
                            },
                            url: 'http://localhost:1000/CapNhatGiaBan',
                            body
                        }, function(error, response, body) {
                            if (error) {
                                console.log('ERROR: Không lấy cập nhật danh sách sách');
                                res.writeHeader(404, { 'Content-Type': 'text/plain' });
                                res.end("Error 404");
                            }
                            res.writeHeader(200, { 'Content-Type': 'text/plain' });
                            res.end(body);
                            cache = "";
                            console.log('-->Done');
                        })
                    });

                    //Bắt lỗi request
                    req.on('error', function(){
                        res.writeHeader(404, { 'Content-Type': 'text/plain' });
                        res.end("Error 404");
                    })

                }
                break;
                case '/CapNhatTinhTrang' : {
                    var body = '';
                    req.on('data', function(chunk) {
                        body += chunk;
                    });
                    
                    req.on('end', function() {
                        request.post({
                            headers: {
                                'Content-Type': 'text/plain',
                                'Access-Control-Allow-Origin': '*'
                            },
                            url: 'http://localhost:1000/CapNhatTinhTrang',
                            body
                        }, function(error, response, body) {
                            if (error) {
                                console.log('ERROR: Không lấy cập nhật danh sách sách');
                                res.writeHeader(404, { 'Content-Type': 'text/plain' });
                                res.end("Error 404");
                            }
                            res.writeHeader(200, { 'Content-Type': 'text/plain' });
                            res.end(body);
                            cache = "";
                            console.log('-->Done');
                        })
                    });

                    //Bắt lỗi request
                    req.on('error', function(){
                        res.writeHeader(404, { 'Content-Type': 'text/plain' });
                        res.end("Error 404");
                    })
                }
                break;
                case '/Login' : {
                    var body = '';
                    req.on('data', function(chunk) {
                        body += chunk;
                    });

                    req.on('end', function() {
                        request.post({
                            headers: {
                                'Content-Type': 'text/plain',
                                'Access-Control-Allow-Origin': '*'
                            },
                            url: 'http://localhost:1000/Login',
                            body
                        }, function(error, response, body) {
                            if (error) {
                                console.log('ERROR: Không lấy cập nhật danh sách sách');
                                res.writeHeader(404, { 'Content-Type': 'text/plain' });
                                res.end("Error 404");
                            }
                            res.writeHeader(200, { 'Content-Type': 'text/plain' });
                            res.end(body);
                            console.log('-->Done');
                        });
                    })
                }
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

