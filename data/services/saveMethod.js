const fs = require("fs");
const DOMParser = require('xmldom').DOMParser;
const XMLSerializer = require('xmldom').XMLSerializer;
const builder = require('xmlbuilder');
let getMethod = require('./getMethod');
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
    } catch (error) {
        return false;
    }
}

let changeNumOfOutstanding = (data) => {
    let code = data.code;
    let newNum = data.newNum;

    let filePath = pathSP + '/' + code + '.xml';

    let xml = fs.readFileSync(filePath, 'utf-8');
    let xmlDOM = new DOMParser().parseFromString(xml, 'text/xml').documentElement;
    xmlDOM.setAttribute('So_luong_ton', newNum);

    let xmlNew = '<?xml version="1.0" encoding="UTF-8"?>\n' + new XMLSerializer().serializeToString(xmlDOM);

    try {
        fs.writeFileSync(filePath, xmlNew, 'utf-8');
        return true;
    } catch (error) {
        return false;
    }
}

let addSaleList = (data) => {
    var bill = JSON.parse(data.billInfo);
    var xmlString = getMethod.getListBooks();
    var xmlDOM = new DOMParser().parseFromString(xmlString, 'text/xml').documentElement;
    var listBooks = xmlDOM.getElementsByTagName('Sach');
    // Kiểm tra hợp lệ
    for (i in bill) {
        let SoLuong = parseInt(bill[i].SoLuong);
        let MaSach = bill[i].MaSach;
        var code, numOfOutstanding;
        for (i = 0; i < listBooks.length; i++) {
            code = listBooks[i].getAttribute('Ma_so');
            if (code == MaSach) {
                numOfOutstanding = parseInt(listBooks[i].getAttribute('So_luong_ton'));
                break;
            }
        }
        if (numOfOutstanding < SoLuong) {
            return false;
        }
        else {
            // cập nhật lại số lượng tồn
            var newNum = numOfOutstanding - SoLuong;
            let data = {code, newNum};
            changeNumOfOutstanding(data);
        }
    }

    let filePath = pathPBH + '/' + data.customerName + '.xml';

    if (fs.existsSync(filePath)) {
        let xml = fs.readFileSync(filePath, 'utf-8');
        let xmlDOM = new DOMParser().parseFromString(xml, 'text/xml');
        var x = xmlDOM.getElementsByTagName("PhieuBanHang");
        for (i in bill) {
            var ThongTinPhieu = xmlDOM.createElement("ThongTinPhieu");
            ThongTinPhieu.setAttribute('TenKhachHang', data.customerName);
            ThongTinPhieu.setAttribute('SDT', data.phone);
            ThongTinPhieu.setAttribute('DiaChi', data.address);
            ThongTinPhieu.setAttribute('TenNhanVien', data.employeeName);
            ThongTinPhieu.setAttribute('ThoiGian', data.time);
            var SanPham = xmlDOM.createElement('SanPham');
            SanPham.setAttribute('MaSach', bill[i].MaSach);
            SanPham.setAttribute('TenSach', bill[i].TenSach);
            SanPham.setAttribute('SoLuong', bill[i].SoLuong);
            SanPham.setAttribute('DonGia', bill[i].DonGia);
            SanPham.setAttribute('TongTien', bill[i].TongTien); 
            ThongTinPhieu.appendChild(xmlDOM.createTextNode('\n'));       
            ThongTinPhieu.appendChild(SanPham);
            ThongTinPhieu.appendChild(xmlDOM.createTextNode('\n'));
            x[0].appendChild(ThongTinPhieu);
            x[0].appendChild(xmlDOM.createTextNode('\n'));   
        }

        let xmlNew = new XMLSerializer().serializeToString(xmlDOM);
        try {
            fs.writeFileSync(filePath, xmlNew, 'utf-8');
            return true;
        } catch (error) {
            return false;
        }
    } else {
        var root = builder.create('PhieuBanHang', {
            version: '1.0',
            encoding: 'UTF-8',
            standalone: true
        }, {
            pubID: null,
            sysID: null
        }, {
            skipNullNodes: false,
            skipNullAttributes: false,
            headless: false,
            ignoreDecorators: false,
            separateArrayItems: false,
            noDoubleEncoding: false,
            stringify: {}
        });

        var info = root.ele('ThongTinPhieu');
        info.att('TenKhachHang', data.customerName);
        info.att('SDT', data.phone);
        info.att('DiaChi', data.address);
        info.att('TenNhanVien', data.employeeName);
        info.att('ThoiGian', data.time);
        for (i in bill) {
            var sp = info.ele('SanPham');
            sp.att('MaSach', bill[i].MaSach);
            sp.att('TenSach', bill[i].TenSach);
            sp.att('SoLuong', bill[i].SoLuong);
            sp.att('DonGia', bill[i].DonGia);
            sp.att('TongTien', bill[i].TongTien);
            sp.end({
                pretty: true
            });
        }
        root.end({
            pretty: true
        });
        try {
            fs.writeFileSync(filePath, root, 'utf-8');
            return true;
        } catch (error) {
            return false;
        }
    }
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
    } catch (error) {
        return dalse;
    }
}

let addProduct = (data) => {
    let code = data.length;

    let filePath = pathSP + '/SACH_' + code + '.xml';

    var root = builder.create('Sach', {
        version: '1.0',
        encoding: 'UTF-8',
        standalone: true
    });
    root.att('Ten', data.name);
    root.att('Ma_so', `SACH_${code}`);
    root.att('Don_gia_Ban', data.exportPrice);
    root.att('So_luong_ton', data.inventory);
    root.att('Tam_ngung', false)

    var sp = root.ele('Nhom_Sach');
    sp.att('Ten', data.nameCategory);
    sp.att('Ma_so', data.category);
    sp.end({
        pretty: true
    });

    root.end({
        pretty: true
    });
    var dataWrite = root;
    fs.writeFileSync(filePath, root, 'utf-8');
}

module.exports = {
    changePrice: changePrice,
    changeStatus: changeStatus,
    addSaleList: addSaleList,
    addProduct: addProduct
}