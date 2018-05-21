const fs = require('fs');
const DOMParser = require('xmldom').DOMParser;
const path = __dirname + '/../Du_lieu.xml';
var DOMParser = require("xmldom").DOMParser
var XMLSerializer = require("xmldom").XMLSerializer
//Lấy danh sách truyện
let getListBooks = () => {
    //let xml = fs.readFileSync(path, 'utf-8');
    var xml = fs.readFileSync(path, "utf-8");
    var dulieu = new DOMParser().parseFromString(xml, "text/xml").documentElement
   // var chuoi_kq = new XMLSerializer().serializeToString(dulieu);
    //return chuoi_kq;
    //return xml;
    var kq = new Map();
    var Ten, Maso, Dongiaban, Dongianhap, Doanhthu, Soluongton, TrangThai;
    
    var danhsachsach = dulieu.getElementsByTagName("Sach");

    for (var i = 0; i < danhsachsach.length; i++) {
        Ten = danhsachsach[i].getAttribute("Ten")
        Maso = danhsachsach[i].getAttribute("Ma_so");
        kq.set({Maso},{Ten});
    }
    return kq;

}

module.exports = {
    getListBooks: getListBooks
}