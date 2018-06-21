const fs = require("fs");
const DOMParser = require('xmldom').DOMParser;
const XMLSerializer = require('xmldom').XMLSerializer;

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
    changeStatus: changeStatus
}