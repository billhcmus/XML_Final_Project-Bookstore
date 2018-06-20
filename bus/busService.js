const app = require('http');
const url = require('url');

const port = 1001;
let cache = "";


app.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log(`${req.method} ${req.url}`);

    switch (req.method) {
        case 'GET':
            switch (req.url) {
                case '/LaySach': {
                    let options = {
                        hostname: 'localhost',
                        port: 1000,
                        path: '/LaySach',
                        method: 'GET'
                    }

                    let httpRes = app.get(options, (response) => {
                        var body = '';
                        response.on('error', () => {
                            console.log('ERROR: Không lấy được danh sách sách');
                            res.writeHeader(404, { 'Content-Type': 'text/plain' });
                            res.end("Error 404");
                        })

                        if (!cache) {
                            response.on('data', (chunk) => {
                                body += chunk;
                            }).on('end', () => {
                                cache = body;
                                res.writeHeader(200, { 'Content-Type': 'text/xml' })
                                res.end(cache);
                                return;
                            })
                            //console.log("Tao cache");
                        }
                        else {
                            res.end(cache);
                            //console.log("Khong tao cache");
                        }
                    })

                    httpRes.on('error', function () {
                        res.writeHeader(404, { 'Content-Type': 'text/plain' });
                        res.end("Can not get data");
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
                case '/CapNhatGiaBan' : {
                    // Nhận dữ liệu
                    var body = '';
                    req.on('data', function(chunk) {
                        body += chunk;
                    });
                  
                    //Gửi dữ liệu
                    req.on('end', function() {
                        let options = {
                            hostname: 'localhost',
                            port: 1000,
                            path: '/CapNhatGiaBan',
                            method: 'POST',
                            headers: {
                                'Content-Type': 'text/plain',
                                'Access-Control-Allow-Origin': '*'
                            }
                        }

                        // Bất đồng bộ
                        let httpRes = app.request(options, (response) => {
                            response.on('error', () => {
                                console.log('ERROR: Không gửi được danh sách sách');
                                res.writeHeader(404, { 'Content-Type': 'text/plain' });
                                res.end("Error 404");
                            });
                            
                            response.on('data', (chunk) => {
                                body += chunk;
                            }).on('end', () => {
                                res.writeHeader(200, { 'Content-Type': 'text/plain' })
                                res.end(body);
                                cache = "";
                                console.log('-->Done');
                            }) 
                        });
                        
                        //Gửi dữ liệu lên dataService
                        httpRes.write(body);
                        httpRes.end();
                        httpRes.on('error', function () {
                            res.writeHeader(404, { 'Content-Type': 'text/plain' });
                            res.end("Can not send data");
                        });

                    })
                }
                break;
                case '/CapNhatTinhTrang' : {
                    // Nhận dữ liệu
                    var body = '';
                    req.on('data', function(chunk) {
                        body += chunk;
                    });
                  
                    //Gửi dữ liệu
                    req.on('end', function() {
                        let options = {
                            hostname: 'localhost',
                            port: 1000,
                            path: '/CapNhatTinhTrang',
                            method: 'POST',
                            headers: {
                                'Content-Type': 'text/plain',
                                'Access-Control-Allow-Origin': '*'
                            }
                        }

                        // Bất đồng bộ
                        let httpRes = app.request(options, (response) => {
                            response.on('error', () => {
                                console.log('ERROR: Không gửi được danh sách sách');
                                res.writeHeader(404, { 'Content-Type': 'text/plain' });
                                res.end("Error 404");
                            });
                            
                            response.on('data', (chunk) => {
                                body += chunk;
                            }).on('end', () => {
                                res.writeHeader(200, { 'Content-Type': 'text/plain' })
                                res.end(body);
                                cache = "";
                                console.log('-->Done');
                            }) 
                        });
                        
                        //Gửi dữ liệu lên dataService
                        httpRes.write(body);
                        httpRes.end();
                        httpRes.on('error', function () {
                            res.writeHeader(404, { 'Content-Type': 'text/plain' });
                            res.end("Can not send data");
                        });

                    })
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

