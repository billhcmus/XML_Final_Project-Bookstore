const app = require('http');
const url = require('url');
const query = require('querystring');
const xml2js = require('xml2js');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const axios = require('axios');


var listBooks = new Map();
const port = 1001;

app.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    readListBooks().payload
    .then(data=>{
         for (var i = 0; i < data.length; i++) {
             var Maso = data[i][0].Maso;
             var Ten = data[i][1].Ten;
             listBooks.set({Maso}, {Ten});
        }
        check();
    });
}).listen(port, err => {
    if (err != null) {
        console.log('==> Error: ', err);
    } else {
        console.log('Server is starting at port ' + port);
    }
});

function check() {
    console.log(listBooks.size);
}

function readListBooks() {

    const request = axios.get('http://localhost:1000/LaySach')
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