function getData() {
    let xhttp = new XMLHttpRequest();
    let query = 'http://localhost:1001/LaySach';
    xhttp.open('GET', query, false);
    xhttp.send();
    let listBooks = JSON.parse(xhttp.responseText);
    return listBooks;
}

function setListBooks(listBooks) {
    if ($('#listBooks').length == 0) {
        return;
    }
    let html = '<ul>';
    for (i = 0; i < listBooks.length; i++) {
        html += `<li class="simpleCart_shelfItem">
                <a class="cbp-vm-image" href="./single.html">
                    <div class="inner_content clearfix">
                        <div class="product_image">
                            <img src="../images/${listBooks[i][0].code}.jpg" class="img-responsive" alt="" />
                            <div class="product_container">
                                <div class="cart-left">
                                    <p class="title">${listBooks[i][1].name}</p>
                                </div>
                                <div class="mount item_price price">${listBooks[i][1].exportPrice} đ</div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                    </div>
                </a>
                <div class="cbp-vm-details">
                    Silver beet shallot wakame tomatillo salsify mung bean beetroot groundnut.
                </div>
                <a class="button item_add cbp-vm-icon cbp-vm-add" href="#">Bán hàng</a>
                </li>`;
    }
    html += '</ul>';
    $('#listBooks').html(html);
}