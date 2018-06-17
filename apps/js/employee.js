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
    var html = '';
    for (i = 0; i < listBooks.length; i++) {
        var importPrice = parseInt(listBooks[i][1].exportPrice,10) + 10000;
        html += `<div class="col-md-3 col-sm-6" style="height: 350px">
        <div class="single-shop-product">
            <div class="product-upper">
                <img src="../images/${listBooks[i][0].code}.jpg" height="150" width="150" alt="">
            </div>
            <h6><a href="">${listBooks[i][1].name}</a></h6>
            <div class="product-carousel-price">
                <ins>${listBooks[i][1].exportPrice} VNĐ</ins> <del>${importPrice} VNĐ</del>
            </div>  
            <div class="product-option-shop">
                <a class="add_to_cart_button" data-quantity="1" data-product_sku="" data-product_id="70" rel="nofollow" href="/canvas/shop/?add-to-cart=70">Bán</a>
            </div>                       
        </div>
    </div>`;
    }
    $('#listBooks').html(html);
}