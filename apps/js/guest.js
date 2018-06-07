function getData() {
    let xhttp = new XMLHttpRequest();
    let query = 'http://localhost:1001/LaySach';
    xhttp.open('GET', query, false);
    xhttp.send();
    let listBooks = JSON.parse(xhttp.responseText);
    console.log(listBooks);
    return listBooks;
}

function setListBooksForNewProduct(listBooks) {
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

    document.getElementById("newBooks").innerHTML = html;
}

let data = getData();
setListBooksForNewProduct(data);