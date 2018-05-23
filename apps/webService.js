const app = require('http')
const fs = require('fs')
const axios = require('axios')

const port = 1002

var listBooks = new Map();

app.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    let req_url = (req.url == '/') ? '/index.html' : req.url

    let file_extension = req.url.lastIndexOf('.');
    let header_type = (file_extension == -1 && req.url != '/')
                    ? 'text/plain'
                    : {
                        '/' : 'text/html',
                        '.html' : 'text/html',
                        '.ico' : 'image/x-icon',
                        '.jpg' : 'image/jpeg',
                        '.png' : 'image/png',
                        '.gif' : 'image/gif',
                        '.css' : 'text/css',
                        '.js' : 'text/javascript'
                        }[ req.url.substr(file_extension) ];

    // Đọc file theo req gửi từ Client lên (lưu ý, phần này sẽ được call nhiều lần để đọc các file Resource)
    fs.readFile( __dirname + req_url, (err, data)=>{
        if (err) {
            console.log('==> Error: ' + err)
            console.log('==> Error 404: file not found ' + res.url)
        
            res.writeHead(404, 'Not found')
            res.end();
        } else {
            // Set Header cho res (phần header_type đã được xử lý tính toán ở dòng code thứ 16 và 17)
            res.setHeader('Content-type' , header_type);

            res.end(data);
            console.log( req.url, header_type );
        }
    })

    readListBooks().payload
    .then(data=>{
         for (var i = 0; i < data.length; i++) {
             var Maso = data[i][0].Maso;
             var Ten = data[i][1].Ten;
             listBooks.set({Maso}, {Ten});
        }
        console.log(listBooks);
    });

}).listen(port, (err) => {
    if(err != null)
        console.log('==> Error: ' + err)
    else
        console.log('Server is starting at port ' + port)
})

function readListBooks() {

    const request = axios.get('http://localhost:1001/LaySach')
    .then(function(response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return Promise.reject(error);
    });

  return {
      payload: request
  };
}