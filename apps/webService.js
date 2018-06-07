var app = require('http');
var fs= require('fs');
var query = require('querystring');
var url = require('url');

var port = 1002;

app.createServer((req,res) => {
	switch(req.method) {
		case 'POST':
		break;
		case 'GET':
		{
			var path = req.url.split('?')[0];

			var req_url = (path == '/') ? '/index.html' : path;

    		var file_extension = req_url.lastIndexOf('.');
    		var duoiFile = req_url.substr(file_extension);

   			var header_type = (file_extension == -1 && req.url != '/')
                    ? 'text/plain'
                    : {
                        '/' : 'text/html',
                        '.html' : 'text/html',
                        '.ico' : 'image/x-icon',
                        '.jpg' : 'image/jpeg',
                        '.png' : 'image/png',
                        '.gif' : 'image/gif',
                        '.css' : 'text/css',
                        '.js' : 'text/javascript',
                        '.map' : 'text/plain'
                        }[duoiFile];

		    // Đọc file theo req gửi từ Client lên
		    fs.readFile( __dirname + req_url, (err, data)=>{
		        if (err) {
		            // Xử lý phần tìm không thấy resource ở Server
		            console.log('==> Error: ' + err)
		            console.log('==> Error 404: file not found ' + res.url)
		            
		            // Set Header của res thành 404 - Not found (thông báo lỗi hiển thị cho Client)
		            res.writeHead(404, 'Not found')
		            res.end()
		        } else {
		            // Set Header cho res
		            res.setHeader('Content-type' , header_type);
		            res.end(data);
		        }
		    })
		}
		break;
		default:
		{
			res.writeHeader(404,{'Content-Type':'text/plain'});
			res.end("Request was not support!!!");
		}
		break;
	}

}).listen(port, (err) => {
	if(err) {
		console.log("ERROR: " + err);
	}
	else {
		console.log("Server is starting at port: " + port);
	}
});