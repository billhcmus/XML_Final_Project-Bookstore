function getData() {
    let xhttp = new XMLHttpRequest();
    let query = 'http://localhost:1001/LaySach';
    xhttp.open('GET', query, false);
    xhttp.send();
    var listBooks = xhttp.responseXML.getElementsByTagName('Sach');
    var length = listBooks.length;
    for (let i = 0;i < length;i++) {
        if (listBooks[i].getAttribute('Tam_ngung') == 'True') {
            listBooks[i].parentNode.removeChild(listBooks[i]);
            length--;
        }
    }
    return listBooks;
}

function setListBooksForNewProduct(listBooks) {
    if ($('#newBooks').length == 0)
        return;
    let length = listBooks.length;
    let html = '';
    let code, name, exportPrice, status;
    for (i = 0; i < 9; i++) {
        random = Math.floor((Math.random() * (length - 1)) + 0);
        code = listBooks[random].getAttribute('Ma_so');
        name = listBooks[random].getAttribute('Ten');
        exportPrice = listBooks[random].getAttribute('Don_gia_Ban');

        if (i % 3 === 0)
            html += `<div class="content_grid">`;

        html += `<div class="col_1_of_3 span_1_of_3 simpleCart_shelfItem">
                    <a href="single.html">
                        <div class="inner_content">
                            <div class="product_image">
                                <img src="images/${code}.jpg" class="img-responsive" alt="" />
                                <a href="" class="button item_add item_1"> </a>
                                <div class="product_container">
                                    <div class="cart-left">
                                        <p class="title">${name}</p>
                                    </div>
                                    <div class="amount item_price special-price">
                                        <span id="product-price-384150411" class="price">${formatNumber(exportPrice)} đ</span>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>`

        if (i === 2 || i === 5 || i === 8)
            html += `</div>`;
    }
    
    $('#newBooks').html(html);
}

function setListBooksForBuy(listBooks) {
    if ($("#buyMuchBooks").length == 0)
        return;
    let length = listBooks.length;
    let count = 0;
    let html = '<ul id="flexiselDemo3">';
    let code, name, exportPrice;
    
    for (i = 0;i < length;i++) {
        code = listBooks[i].getAttribute('Ma_so');
        name = listBooks[i].getAttribute('Ten');
        exportPrice = listBooks[i].getAttribute('Don_gia_Ban');

        if (name.length < 35) {
            html +=     `<li>
                            <img src="images/${code}.jpg" class="img-responsive"  width="270px" height="324px"/>
                            <div class="grid-flex">
                                <div href="#">${name}</div>
                                <p>${formatNumber(exportPrice)} đ</p>
                            </div>
                        </li>`
            count++;
        }
        
        if (count === 10)
            break;
    }
    html += '</ul>';
    $("#buyMuchBooks").html(html);
}

function setListBooksForShop(listBooks, numberBooksOfAPage) {
    if ($("#listBooksForShop").length === 0)
        return;
    let length = listBooks.length;
    let html = '<ul>';
    let code, name, exportPrice, category;

    for (i = 0;i < numberBooksOfAPage;i++) {
        code = listBooks[i].getAttribute('Ma_so');
        name = listBooks[i].getAttribute('Ten');
        exportPrice = listBooks[i].getAttribute('Don_gia_Ban');

            html += `<li class="simpleCart_shelfItem">
            <a class="cbp-vm-image" href="./single.html">
                <div class="inner_content clearfix">
                    <div class="product_image">
                        <img src="images/${code}.jpg" class="img-responsive" alt="" />
                        <div class="product_container_shop">
                            <div class="cart-left">
                                <p class="title">${name}</p>
                            </div>
                            <div class="mount item_price price">${formatNumber(exportPrice)} đ</div>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                </div>
            </a>
        </li>`
    }
    html += '</ul>';
    $("#listBooksForShop").html(html);
}

function setListBooksbyCategory(listBooks , categoryQuery) {
    if ($("#listBooksForShop").length === 0)
        return;
    let length = listBooks.length;
    let html = '<ul>';
    let code, name, exportPrice, category;

    let nameOfCategory = parseQuery(categoryQuery);

    for (i = 0;i < length;i++) {
        code = listBooks[i].getAttribute('Ma_so');
        name = listBooks[i].getAttribute('Ten');
        exportPrice = listBooks[i].getAttribute('Don_gia_Ban');
        category = listBooks[i].getElementsByTagName('Nhom_Sach')[0].getAttribute('Ma_so');

        if (category == nameOfCategory) {
            html += `<li class="simpleCart_shelfItem">
            <a class="cbp-vm-image" href="./single.html">
                <div class="inner_content clearfix">
                    <div class="product_image">
                        <img src="images/${code}.jpg" class="img-responsive" alt="" />
                        <div class="product_container_shop">
                            <div class="cart-left">
                                <p class="title">${name}</p>
                            </div>
                            <div class="mount item_price price">${formatNumber(exportPrice)} đ</div>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                </div>
            </a>
        </li>`
        }
    }
    html += '</ul>';
    $("#listBooksForShop").html(html);
}

function formatNumber(number) {
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function parseQuery(params) {
    let index = params.lastIndexOf('=');
    return params.slice(index + 1);
}