function getData() {
    let xhttp = new XMLHttpRequest();
    let query = 'http://localhost:1001/LaySach';
    xhttp.open('GET', query, false);
    xhttp.send();
    let listBooks = xhttp.responseXML.getElementsByTagName('Sach');
    return listBooks;
}

function setListBooks(listBooks) {
    if ($('#listBooks').length == 0) {
        return;
    }
    var html = `<div class='row'>`;
    for (i = 0; i < listBooks.length; i++) {
        var importPrice = parseInt(listBooks[i].getAttribute('Don_gia_Ban'), 10);
        var name = listBooks[i].getAttribute('Ten');
        var code = listBooks[i].getAttribute('Ma_so');
        var exportPrice = listBooks[i].getAttribute('Don_gia_Ban');
        var cost = parseInt(exportPrice, 10) + 10000;

        var arr = [name, code, exportPrice];
        if (i % 4 === 0 && i >= 4) {
            html += `</div><div class='row'>`;
        }

        html += `<div class="col-md-3 col-sm-6">
            <div class="single-shop-product">
                <div class="inner_content_product">
                    <div class="product_image">
                        <img src="../images/${code}.jpg">
                        <div class="product_image">
                            <div class="cart-left">
                                <p class="title">${name}</p>
                            </div>
                        </div>
                    </div>
                    <div class="product-option-shop">
                        <button type="button" name="${name}" code="${code}" exportPrice="${exportPrice}" class="btn btn-success btn-lock btnSell">Bán</button>
                        <a class="prime">${formatNumber(exportPrice)} VNĐ</a>
                    </div>                   
                </div>
            </div>
        </div>`;
    }
    html += '</div>'
    $('#listBooks').html(html);
}

function formatNumber(number) {
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

$(document).ready(function () {
    $('.btnSell').click(function () {
        var name=$(this).attr("name");
        var code=$(this).attr("code");
        var exportPrice=$(this).attr("exportPrice");
        $(".modal-body #nameOfProduct").val(name);
        $(".modal-body #codeOfProduct").val(code);
        $(".modal-body #priceOfProduct").val(exportPrice);
        $('#modalOfSell').modal();
    });

    $('.btnSubmitSell').click(function () {
        let numOfProduct = parseInt($('#numOfProduct').val());
        let productName = $('#nameOfProduct').val();
        let code = $('#codeOfProduct').val();
        let price = parseInt($('#priceOfProduct').val());
        let TotalPrice = formatNumber(price * numOfProduct);
        price = formatNumber(price);
        var html = `
        <tr>
            <td>${code}</td>
            <td>${productName}</td>
            <td>${numOfProduct}</td>
            <td>${price} VNĐ</td>
            <td>${TotalPrice} VNĐ</td>
        </tr>
        `;
        $('#listSellProduct').append(html);
        $('#modalOfSell').modal('hide');
    });


    let obj = undefined;

    $('.btnSubmitListSellProduct').click(function() {
        let customerName = $('#name').val();
        let phone = $('#phone').val();
        let address = $('#address').val();
        let employeeName = sessionStorage.getItem('name');
    
        var d = new Date();

        var time = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes();

        obj = {
            customerName,
            phone,
            address,
            employeeName,
            time
        }
        var arr = [];
        $(function () {
            $('#listSellProduct tr').each(function () {
               let code = $(this).find('td:nth-child(1)').text();
               let productName = $(this).find('td:nth-child(2)').text();
               let numOfProduct = $(this).find('td:nth-child(3)').text();
               let price = $(this).find('td:nth-child(4)').text();
               let TotalPrice = $(this).find('td:nth-child(5)').text();
               arr.push({MaSach: code, TenSach: productName, SoLuong: numOfProduct, DonGia: price, TongTien: TotalPrice});
            });
        });
        let billInfo = JSON.stringify(arr);
        obj = {
            ...obj,
            billInfo,
            session: sessionStorage.getItem('session')
        }
        if (obj) {
            $.post('http://localhost:1001/ThemPhieuBan',
            JSON.stringify(obj),
            (data) => {
                location.reload(true);
            },
            'text'
        )
        }
    });
});


let data = getData();
setListBooks(data);