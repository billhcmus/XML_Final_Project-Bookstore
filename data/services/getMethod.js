const fs = require('fs');
const DOMParser = require('xmldom').DOMParser;
const path = __dirname + '/../Du_lieu.xml';

function readData() {
    let xml = fs.readFileSync(path, "utf-8");
    let xmlDOM = new DOMParser().parseFromString(xml, "text/xml").documentElement;
    return xmlDOM;
}

//Lấy danh sách truyện
let getListBooks = (xmlDOM) => {
    let map = new Map();
    let name, code, exportPrice, importPrice, revenue, inventory, status;

    let listBooks = xmlDOM.getElementsByTagName("Sach");

    for (let i = 0; i < listBooks.length; i++) {
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

let getListBooksForAdmin = (xmlDOM) => {
    let map = new Map();
    let code, name, exportPrice, inventory;
}


module.exports = {
    readData: readData,
    getListBooks: getListBooks
}