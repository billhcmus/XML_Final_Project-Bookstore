function getData() {
    let xhttp = new XMLHttpRequest();
    let query = 'http://localhost:1001/LaySach';
    xhttp.open('GET', query, false);
    xhttp.send();
    var listBooks = xhttp.responseXML.getElementsByTagName('Sach');
    return listBooks;
}

function getDanhSachBan() {
    let xhttp = new XMLHttpRequest();
    let query = 'http://localhost:1001/LayDanhSachBan';
    xhttp.open('GET', query, false);
    xhttp.send();
    var danhSachBan = xhttp.responseXML.getElementsByTagName('PhieuBanHang');
    return danhSachBan;
}

function setListBooksForAdmin(listBooks, start, end) {
    if ($("#listBooksForAdmin").length === 0)
        return;
    let length = listBooks.length;
    let html = `<div class='row'>`;
    let code, name, exportPrice;

    for (i = start;i < end;i++) {
        code = listBooks[i].getAttribute('Ma_so');
        name = listBooks[i].getAttribute('Ten');
        exportPrice = listBooks[i].getAttribute('Don_gia_Ban');

        if (i % 4 === 0 && i >= 4)
            html += `</div><div class='row'>`;
        html += `<div class="col-sm-3">
                    <a class="cbp-vm-image" href="./single.html">
                        <div class="inner_content">
                            <div class="product_image" style='margin: 10%'>
                                <img src="images/${code}.jpg" class="img-responsive" alt="" style='width: 300px; height: 330px;'/>
                                <div class="product_container">
                                    <div class="cart-left">
                                        <p class="title">${name}</p>
                                    </div>
                                    <div class="mount item_price price">${formatNumber(exportPrice)} VND</div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>`
    }
    html += '</div>';
    $("#listBooksForAdmin").html(html);
}

function changePrice(listBooks) {
    if ($("#listForChangePrice").length === 0)
        return;
    let html = '';
    let code, name, exportPrice;
    let length = listBooks.length;
    
    for (let i = 0;i < length;i++) {
        code = listBooks[i].getAttribute('Ma_so');
        name = listBooks[i].getAttribute('Ten');
        exportPrice = listBooks[i].getAttribute('Don_gia_Ban');
        
        html += `<tr>
                    <td>
                        <img src="images/${code}.jpg" class="img-responsive" alt="" style='width: 25px; height: 25px;'/>
                    </td>
                    <td>${code}</td>
                    <td>${name}</td>
                    <td>${formatNumber(exportPrice)}VND</td>
                    <td><button type="button" class="btn btn-success updatePrice">Sửa</button></td>
                </tr>`     
    }
    $("#listForChangePrice").html(html);
}

function suppendBook(listBooks) {
    if ($("#listSuppended").length === 0 || $("#listActive").length === 0)
        return;

    let length = listBooks.length;
    let html_sup = '', html_act = '';
    let code, name, exportPrice, suppend;

    for (let i = 0;i < length;i++) {
        code = listBooks[i].getAttribute('Ma_so');
        name = listBooks[i].getAttribute('Ten');
        suppend = listBooks[i].getAttribute('Tam_ngung');
        if (suppend == "True") {
            html_sup += `<tr data-toggle="toggle" data-size="mini">
                        <td>
                            <img src="images/${code}.jpg" class="img-responsive" alt="" style='width: 25px; height: 25px;'/>
                        </td>
                        <td>${code}</td>
                        <td>${name}</td>
                        <td><div style="height: 25px">   
                            <input type="checkbox" data-toggle="toggle" data-size="mini" class="btn_sup">
                        </div></td>
                    </tr>`
        }
        else {
            html_act += `<tr data-toggle="toggle" data-size="mini">
                        <td>
                            <img src="images/${code}.jpg" class="img-responsive" alt="" style='width: 25px; height: 25px;'/>
                        </td>
                        <td>${code}</td>
                        <td>${name}</td>
                        <td><div style="height: 25px">   
                            <input type="checkbox" checked data-toggle="toggle" data-size="mini">
                        </div></td>
                    </tr>`
        }
    }
    $("#listSuppended").html(html_sup);
    $("#listActive").html(html_act);
}


//////////////////////////////////////////////////////Xử lý view
var data = getData();
let danhSachBan = getDanhSachBan();

let params = location.search;
let key = parseQuery(params).key;
let value = parseQuery(params).value;

changePrice(data);
suppendBook(data);

switch (key) {
    case 'view': {
        paginationView(data, value);
        break;
    }
    default: {
        setListBooksForAdmin(data, 0 ,12);
    }   
}

$('a:not(.button_seeProduct)').click(function() {
    $('#pagination_admin').hide();
});
$('.button_seeProduct, .page-item').click(function () {
    $('#pagination_admin').show();
});



////////////////////////////////////////////////Nhấn nút sửa
let obj = undefined;
$('.updatePrice').click(function () {
    let code = $(this).closest('tr').find('td:nth-child(2)').text();
    let name = $(this).closest('tr').find('td:nth-child(3)').text();
    let priceOld =  $(this).closest('tr').find('td:nth-child(4)').text();

    obj = {
        code,
        name,
        priceOld
    }

    $('#modalOfPrice').modal('show');
    $('#priceOld').val(obj.priceOld);
    $('#closeModalPrice').click(function() {
        $('#priceNew').val("");
    });
    
});

//////////////////////////////////////////////////// Submit Price
$("#submit_price").click(function () {
    let priceNew = $('#priceNew').val();
    obj = {
        ...obj,
        priceNew,
        session: sessionStorage.getItem('session')
    }
    if (obj) {
        $.post('http://localhost:1001/CapNhatGiaBan',
            JSON.stringify(obj),
            (data) =>  {
                location.reload(true); //load lại trang
            },
            'text'
        )
        return true;
    }
});

////////////////////////////////////////////////// Nhấn switch toggle
$('input[type="checkbox"]').change(function() {
    let code = $(this).closest('tr').find('td:nth-child(2)').text();
    let name = $(this).closest('tr').find('td:nth-child(3)').text();
    let status;

    if($(this).prop("checked") == true)
        status = "False";
    else
        status = "True";

    obj = {
        code,
        name,
        status,
        session: sessionStorage.getItem('session')
    }

    $('#modalOfStatus').modal('show');
    $('#closeModalStatus').click(function() {
        if (status === 'False')
            $(this).bootstrapToggle('on');
        else
            $(this).bootstrapToggle('off');
    })
});

/////////////////////////////////////////////// Submit status
$('#submit_status').click(function() {
    try {
        $.post('http://localhost:1001/CapNhatTinhTrang',
            JSON.stringify(obj),
            (data) =>  {
                location.reload(true); //load lại trang
            },
            'text'
        );
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
});

$('#addBook').click(function() {
    let name = $('#name').val();
    let category = $('#productType').val();
    let exportPrice = $('#exportprice').val();
    let inventory  = $('#inventory').val();
    let nameCategory = $("#productType option:selected").text();
    obj = {
        name, category, exportPrice, inventory, nameCategory, 
        length: data.length,
        session: sessionStorage.getItem('session')
    }
    $('#modalOfAddProduct').modal('show');
});

$('#submit_addProduct').click(function() {
    try {
        $.post('http://localhost:1001/BoSungMatHang',
            JSON.stringify(obj),
            (data) =>  {
                location.reload(true); //load lại trang
            },
            'text'
        );
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
})

///////////////////////////////////////////////////Phân trang

function paginationView(data, value) {
    value = +value;
    end = (value * 12 + 12) < data.length ? (value * 12 + 12) : data.length; 
    setListBooksForAdmin(data, value * 12, end);
}

function parseQuery(params) {
    let indexEqual = params.lastIndexOf('=');
    let indexQuestionMark = params.lastIndexOf('?');

    return {
        key: params.slice(indexQuestionMark + 1, indexEqual),
        value: params.slice(indexEqual + 1)
    }
}

function formatNumber(number) {
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

//Thống kê
let statisticByCategory =  function(listBooks) {
    let length = listBooks.length;
    let arr = [];

    for ( i = 0; i < length; i++) {
        category = listBooks[i].getElementsByTagName('Nhom_Sach')[0].getAttribute('Ma_so');
        arr[category] = 0;
    }
    for ( i = 0; i < length; i++) {
        category = listBooks[i].getElementsByTagName('Nhom_Sach')[0].getAttribute('Ma_so');
        arr[category]++;
    }
    obj = [{ x: 1, y: arr['DIEN'], label: 'Điện tử'},
            {x: 2, y: arr['KHOAHOC'], label: 'Khoa học'},
            {x: 3, y: arr['KINHTE'], label: 'Kinh tế'},
            {x: 4, y: arr['TINHOC'], label: 'Tin học'},
            {x: 5, y: arr['VANHOC'], label: 'Văn học'}];
    return obj;
}

let frequentlyBuyingBook = (listBooks) => {
    let length = listBooks.length;
    let arr = [];

    for (i = 0;i < length;i++) {
        product = listBooks[i].getElementsByTagName('SanPham');
        length_product = product.length;
        for (j = 0;j < length_product;j++) {
            arr.push({
                money: product[j].getAttribute('TongTien'),
                name: product[j].getAttribute('TenSach') 
            });
        }   
    }

    let result = {};
    let length_arr = arr.length;
    for (i = 0;i < length_arr; i++) {
       if (!result[arr[i].name])
            result[arr[i].name] = 0;
        result[arr[i].name] += formatPrice(arr[i].money);
    }
    
    let obj = [];
    for (key in result) {
        obj.push({
            y: result[key],
            indexLabel: key
        })
    }

    //sort
    obj.sort((a,b) => {
        return a.y - b.y;
    })
    return obj.slice(0,5);
}

function tinhDoanhThu(danhSachBan) {
    let doanhThu = 0;
    let length = danhSachBan.length;
    for (i = 0;i < length;i++) {
        sp = danhSachBan[i].getElementsByTagName('SanPham');
        length_sp = sp.length;
        for (j = 0;j < length_sp;j++) {
            doanhThu += formatPrice(sp[j].getAttribute('TongTien'));
        }
    }
    return doanhThu;
}

$('#_charts').click(function(){
    $('#dashboard_page').hide();
    $('#charts_page').show();

    
    var chart_1 = new CanvasJS.Chart("chartContainer_1",
        {
            animationEnabled: true,
            animationDuration: 4000,   //change to 1000, 500 etc
            title: {
                text: "Thống kê theo thể loại",
                fontFamily: 'Arial'
            },
            data: [
                {
                    type: "column",
                    dataPoints: statisticByCategory(data)
                }
            ]
        });
        chart_1.render();
    

        var chart_2 = new CanvasJS.Chart("chartContainer_2",
        {
            animationEnabled: true, 
		    animationDuration: 2000,
            title:{
                text: "Thống kê theo top 5 sách",
                fontFamily: 'Arial'
            },
            legend: {
                maxWidth: 350,
                itemWidth: 120
            },
            data: [
            {
                type: "pie",
                showInLegend: true,
                toolTipContent: "{y} - #percent %",
                yValueFormatString: "###,##0,### VND",
                legendText: "{indexLabel}",
                dataPoints: frequentlyBuyingBook(danhSachBan)
            }
            ]
        });
        chart_2.render();

    $('#turnover').html(`Doanh thu:  ${formatNumber(tinhDoanhThu(danhSachBan))} VND`);
})

function formatPrice(price) {
    let origin = price.slice(0, price.indexOf(','));
    let decimal = price.slice(price.indexOf(',') + 1, price.indexOf(' '));
    return origin*1000 + +decimal; 
}