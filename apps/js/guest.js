function getData() {
    let xhttp = new XMLHttpRequest();
    let query = 'http://localhost:1001/LaySach';
    xhttp.open('GET', query, false);
    xhttp.send();
    let listBooks = JSON.parse(xhttp.responseText);
    return listBooks;
}

function setListBooksForNewProduct(listBooks) {
    if ($('#newBooks').length == 0)
        return;
    let length = listBooks.length;
    let html = '';
    for (i = 0; i < 9; i++) {
        random = Math.floor((Math.random() * (length - 1)) + 0);
        if (i % 3 === 0)
            html += `<div class="content_grid">`;

        html += `<div class="col_1_of_3 span_1_of_3 simpleCart_shelfItem">
                    <a href="single.html">
                        <div class="inner_content">
                            <div class="product_image">
                                <img src="images/${listBooks[random][0].code}.jpg" class="img-responsive" alt="" />
                                <a href="" class="button item_add item_1"> </a>
                                <div class="product_container">
                                    <div class="cart-left">
                                        <p class="title">${listBooks[random][1].name}</p>
                                    </div>
                                    <div class="amount item_price">${listBooks[random][1].exportPrice} đ</div>
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
    for (i = 0;i < length;i++) {
        if (listBooks[i][1].name.length < 35) {
            html +=     `<li>
                            <img src="images/${listBooks[i][0].code}.jpg" class="img-responsive"  width="270px" height="324px"/>
                            <div class="grid-flex">
                                <div href="#">${listBooks[i][1].name}</div>
                                <p>${listBooks[i][1].exportPrice}</p>
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
    for (i = 0;i < numberBooksOfAPage;i++) {
        html += `<li class="simpleCart_shelfItem">
                    <a class="cbp-vm-image" href="./single.html">
                        <div class="inner_content clearfix">
                            <div class="product_image">
                                <img src="images/${listBooks[i][0].code}.jpg" class="img-responsive" alt="" />
                                <div class="product_container_shop">
                                    <div class="cart-left">
                                        <p class="title">${listBooks[i][1].name}</p>
                                    </div>
                                    <div class="mount item_price price">${listBooks[i][1].exportPrice} đ</div>
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