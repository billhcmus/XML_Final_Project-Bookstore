const app = require('http');
const fs = require('fs');
const resError = require('./js/error');
const port = 1002;

let session;
let position = '';

app.createServer((req, res) => {
	switch (req.method) {
		case 'POST':
			{
				switch (req.url) {
					case '/KiemTraViTri' :
					 {
						var body = '';
						req.on('data', function(chunk) {
							body += chunk;
						});
						req.on('end', function() { 
							var data = JSON.parse(body);
							position = data.account.position;
							res.writeHeader(200, { 'Content-Type': 'text/plain' });
							res.end('Thành công');	
						});
					 }
					 break;
					 case '/Logout' :
					 {
						position = '';
						req.on('end', function() { 
							res.writeHeader(200, { 'Content-Type': 'text/plain' });
							res.end('Logout success');	
						});
					 }
					 break;
				}
			}
			break;
		case 'GET':
			{
				var path = req.url.split('?')[0];

				var req_url = (path == '/') ? '/index.html' : path;

				if (req_url === '/admin.html' && position === 'nhanvien') {
					resError(res, 'Không thể truy cập trang admin');
				}
				else if (req_url === '/employee.html' && position === 'admin') {
					resError(res, 'Không thể truy cập trang nhân viên');
				}
				else if (position === '' && (req_url === '/employee.html' || req_url === '/admin.html')) {
					resError(res, 'Tài khoản không có quyền truy cập trang này');
				}
				else {
					var file_extension = req_url.lastIndexOf('.');
				var duoiFile = req_url.substr(file_extension);

				var header_type = (file_extension == -1 && req.url != '/')
					? 'text/plain'
					: {
						'/': 'text/html',
						'.html': 'text/html',
						'.ico': 'image/x-icon',
						'.jpg': 'image/jpeg',
						'.png': 'image/png',
						'.gif': 'image/gif',
						'.css': 'text/css',
						'.js': 'text/javascript',
						'.map': 'text/plain'
					}[duoiFile];

				// Đọc file theo req gửi từ Client lên
				fs.readFile(__dirname + req_url, (err, data) => {
					if (err) {
						// Xử lý phần tìm không thấy resource ở Server
						console.log('==> Error: ' + err)
						console.log('==> Error 404: file not found ' + res.url)

						// Set Header của res thành 404 - Not found (thông báo lỗi hiển thị cho Client)
						resError(res, '');
					} else {
						// Set Header cho res
						res.setHeader('Content-type', header_type);
						res.end(data);
					}
				});
				}
			}
			break;
		default:
			{
				resError(res, "Request was not support!!!");
			}
			break;
	}

}).listen(port, (err) => {
	if (err) {
		console.log("ERROR: " + err);
	}
	else {
		console.log("Server is starting at port: " + port);
	}
});