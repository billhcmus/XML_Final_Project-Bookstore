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
                                    <div class="mount item_price price">${exportPrice}đ</div>
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
    if ($("#changePrice").length === 0)
        return;
    let length = listBooks.length;
    let html = '';
    let code, name, exportPrice;
    
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
    $("#changePrice").html(html);
}

function formatNumber(number) {
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

//Xử lý view
var data = getData();
setListBooksForAdmin(data, 0, 12);
changePrice(data);

$('.page-item:eq(0)').click(function(){
        setListBooksForAdmin(data, 0, 12);
});
$('.page-item:eq(1)').click(function(){
    setListBooksForAdmin(data, 12, 24);
});
$('.page-item:eq(2)').click(function(){
    setListBooksForAdmin(data, 24, 36);
});
$('.page-item:eq(3)').click(function(){
    setListBooksForAdmin(data, 36, 48);
});
$('.page-item:eq(4)').click(function(){
    setListBooksForAdmin(data, 48, 50);
});

//Process panigation
$('a:not(.button_seeProduct)').click(function() {
    $('#pagination_admin').hide();
});
$('.button_seeProduct, .page-item').click(function () {
    $('#pagination_admin').show();
});

$('#searchBook').click(function() {
    let content = $('#txtSearchBook').val();
    let length = data.length;
    let html = '';
    let code, name, exportPrice;

    for (i = 0;i < length;i++) {
        code = data[i].getAttribute('Ma_so');
        name = data[i].getAttribute('Ten');
        exportPrice = data[i].getAttribute('Don_gia_Ban');
        
        if (name.toUpperCase().includes(content.toUpperCase()) 
        || code.toUpperCase().includes(content.toUpperCase())) {
            html += `<tr>
                        <td>
                            <img src="images/${code}.jpg" class="img-responsive" alt="" style='width: 25px; height: 25px;'/>
                        </td>
                        <td>${code}</td>
                        <td>${name}</td>
                        <td>${formatNumber(exportPrice)}đ</td>
                        <td><button type="button" class="btn btn-success updatePrice" data-toggle="modal" data-target="#myModal">Sửa</button></td>
                    </tr>`
        }
    }
    $("#changePrice").html(html);
});

$('.updatePrice').click(function () {
    let priceOld =  $(this).closest('tr').find('td:nth-child(4)').text();
    $('#myModal').modal('show');
    $('#priceOld').val(priceOld);
})

$('#closeModal').click(function() {
    $('#priceNew').val("");
})