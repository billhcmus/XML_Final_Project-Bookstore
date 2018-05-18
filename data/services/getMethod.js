const fs = require('fs');
const xml2js = require('xml2js');

const path = __dirname + '/../Du_lieu.xml';

let listBooks = [];

//Lấy danh sách truyện
let getListBooks = () => {
    let data = fs.readFileSync(path, 'utf-8');
    var parser = new xml2js.Parser()
    parser.parseString(data, function (err, result) {
        let builder = new xml2js.Builder();
        let xml = builder.buildObject(result.Danh_sach_Sach);
        return xml;
    })
}

module.exports = {
    getListBooks: getListBooks
}