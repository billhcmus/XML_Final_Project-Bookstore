const app = require('http');
const url = require('url');
const query = require('querystring');
const xml2js = require('xml2js');

const axios = require('axios');

let listBooks;
const port = 1001;

app.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    readListBooks();
}).listen(port, err => {
    if (err != null) {
        console.log('==> Error: ', err);
    }
    else {
        console.log('Server is starting at port ' + port);
    }
});
 
function readListBooks() {
    axios.get('http://localhost:1000/')
        .then(function(response) {
            var parser = new xml2js.Parser()
            parser.parseString(response.data, function (err, result) {
                listBooks = result.Danh_sach_Sach.Sach;
            });
            return listBooks;
        })
        .catch(function(error) {
            console.log(error);
        });
}