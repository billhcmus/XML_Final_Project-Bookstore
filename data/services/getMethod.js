const fs = require('fs');
const DOMParser = require('xmldom').DOMParser;
const xml2js = require('xml2js');
const path = __dirname + '/../San_Pham';

//Lấy danh sách truyện
let getListBooks = () => {
    listBooks = [];
    fs.readdirSync(path).forEach(file => {
        var filePath = path + "/" + file;
        var parser = new xml2js.Parser();
        var data = fs.readFileSync(filePath, "utf-8");

        parser.parseString(data, function (err, result) {
            listBooks.push(result);
        })
    })
    var builder = new xml2js.Builder();
    var xml = builder.buildObject(listBooks);
    return xml;
}


module.exports = {
    getListBooks: getListBooks,
}