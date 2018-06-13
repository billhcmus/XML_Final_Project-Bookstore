const fs = require('fs');
const DOMParser = require('xmldom').DOMParser;
const path = __dirname + '/../Du_lieu.xml';

function readData() {
    var xml = fs.readFileSync(path, "utf-8");
    var xmlDOM = new DOMParser().parseFromString(xml, "text/xml").documentElement;
    return xmlDOM;
}

//Lấy danh sách truyện
let getListBooks = (xmlDOM) => {
    var map = new Map();
    var name, code, exportPrice, importPrice, revenue, inventory, status;

    var listBooks = xmlDOM.getElementsByTagName("Sach");

    for (var i = 0; i < listBooks.length; i++) {
        code = listBooks[i].getAttribute("Ma_so");
        name = listBooks[i].getAttribute("Ten")
        exportPrice = listBooks[i].getAttribute("Don_gia_Ban");
        inventory = listBooks[i].getAttribute("So_luong_ton");

        map.set({
            code
        },{
            name,
            exportPrice,
            inventory
        });
    }
    return map;
}

module.exports = {
    readData: readData,
    getListBooks: getListBooks
}