function getData() {
    let xhttp = new XMLHttpRequest();
    let query = 'http://localhost:1001/LaySach';
    xhttp.open('GET', query, false);
    xhttp.send();
    var listBooks = xhttp.responseXML.getElementsByTagName('Sach');
    return listBooks;
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
                                    <div class="mount item_price price">${formatNumber(exportPrice)} đ</div>
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
                    <td>${formatNumber(exportPrice)}đ</td>
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