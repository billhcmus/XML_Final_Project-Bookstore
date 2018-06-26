const fs = require("fs");
const DOMParser = require('xmldom').DOMParser;
const XMLSerializer = require('xmldom').XMLSerializer;
const builder = require('xmlbuilder');

const pathSP = __dirname + '/../San_Pham'
const pathPBH = __dirname + '/../Phieu_Ban_hang'

let changePrice = (data) => {
    let code = data.code;
    let priceNew = data.priceNew;

    let filePath = pathSP + '/' + code + '.xml';

    let xml = fs.readFileSync(filePath, 'utf-8');
    let xmlDOM = new DOMParser().parseFromString(xml, 'text/xml').documentElement;
    xmlDOM.setAttribute('Don_gia_Ban', priceNew);

    let xmlNew = '<?xml version="1.0" encoding="UTF-8"?>\n' + new XMLSerializer().serializeToString(xmlDOM);
    
    try {
        fs.writeFileSync(filePath, xmlNew, 'utf-8');
        return true;
    }
    catch (error) {
        return dalse;
    }

}

let addSaleList = (data) => {
    let filePath = pathPBH + '/' + data.customerName + '.xml';

    var bill = JSON.parse(data.billInfo);
    var root = builder.create('ThongTinPhieu', {version: '1.0', encoding: 'UTF-8', standalone: true});
    root.att('TenKhachHang', data.customerName);
    root.att('SDT', data.phone);
    root.att('DiaChi', data.address);
    for (i in bill) {
        var sp = root.ele('SanPham');
        sp.att('MaSach', bill[i].MaSach);
        sp.att('TenSach', bill[i].TenSach);
        sp.att('SoLuong', bill[i].SoLuong);
        sp.att('DonGia', bill[i].DonGia);
        sp.att('TongTien', bill[i].TongTien);
        sp.end({pretty: true});
    }
    root.end({pretty: true});
    var dataWrite = root;
    fs.writeFileSync(filePath, root, 'utf-8');
}

let changeStatus = (data) => {
    let code = data.code;
    let status = data.status;

    let filePath = pathSP + '/' + code + '.xml';

    let xml = fs.readFileSync(filePath, 'utf-8');
    let xmlDOM = new DOMParser().parseFromString(xml, 'text/xml').documentElement;
    xmlDOM.setAttribute('Tam_ngung', status);

    let xmlNew = '<?xml version="1.0" encoding="UTF-8"?>\n' + new XMLSerializer().serializeToString(xmlDOM);
    
    try {
        fs.writeFileSync(filePath, xmlNew, 'utf-8');
        return true;
    }
    catch (error) {
        return dalse;
    }
}

module.exports = {
    changePrice: changePrice,
    changeStatus: changeStatus,
    addSaleList: addSaleList
}