const app = require('http');
const url = require('url');

const port = 1001;

let count = 0;

app.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log(`${req.method} ${req.url}`);
   
    switch(req.method) {
        case 'GET':
            switch(req.url) {
                case '/LaySach': {
                    let options = {
						hostname: 'localhost',
						port : 1000,
						path : '/LaySach',
						method : 'GET'
                    }
                    
                    let httpRes = app.get(options, (response) => {
                        var body = '';
                        response.on('error', () => {
                            console.log('ERROR: Không lấy được danh sách sách');
							res.writeHeader(404,{'Content-Type':'text/plain'});
							res.end("Error 404");
                        })
                       
                        response.on('data', (chunk) => {
                            body += chunk;
                        }).on('end', () => {
                            res.writeHeader(200,{'Content-Type':'text/xml'})
                            res.end(body);
                            return;
                        })
                        
                        
                    })

                    httpRes.on('error', function() {
                        res.writeHeader(404,{'Content-Type':'text/plain'});
                        res.end("Can not get data");
                    });
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
                default:
                    res.writeHeader(404, {'Content-Type': 'text/plain'})
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

