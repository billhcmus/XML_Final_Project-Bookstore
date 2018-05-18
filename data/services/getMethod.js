const fs = require('fs');

const path = __dirname + '/../Du_lieu.xml';

//Lấy danh sách truyện
let getListBooks = () => {
    let xml = fs.readFileSync(path, 'utf-8');
    return xml;
}

module.exports = {
    getListBooks: getListBooks
}