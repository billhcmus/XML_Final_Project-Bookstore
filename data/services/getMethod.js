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
    let length = listBooks.length;

    for (let i = 0; i < length; i++) {
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
    let code, name, exportPrice, inventory, sellProduct, sellNumber;
    let listBooks = xmlDOM.getElementsByTagName("Sach");
    let length = listBooks.length;

    for (let i = 0;i < length;i++) {
        code = listBooks[i].getAttribute("Ma_so");
        name = listBooks[i].getAttribute("Ten");
        exportPrice = listBooks[i].getAttribute("Don_gia_Ban");
        inventory = listBooks[i].getAttribute("So_luong_ton");
        sellProduct = listBooks[i].getElementsByTagName("Danh_sach_ban_hang")[0].getElementsByTagName('Ban_hang');
        
        lengthSell = sellProduct.length; 
        sellNumber = 0;
        for (let j = 0; j < lengthSell;j++) {
            sellNumber += +sellProduct[j].getAttribute('So_luong');
        }

        map.set({
            code
        }, {
            name,
            exportPrice,
            inventory,
            sellNumber
        })
        
    }

    return map;
    
}


module.exports = {
    readData: readData,
    getListBooks: getListBooks,
    getListBooksForAdmin: getListBooksForAdmin
}