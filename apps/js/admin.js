function getData() {
    let xhttp = new XMLHttpRequest();
    let query = 'http://localhost:1001/LaySachChoAdmin';
    xhttp.open('GET', query, false);
    xhttp.send();
    let listBooks = JSON.parse(xhttp.responseText);
    return listBooks;
}

function setListBooksForAdmin(listBooks, start, end) {
    if ($("#listBooksForAdmin").length === 0)
        return;
    let length = listBooks.length;
    let html = `<div class='row'>`;
    for (i = start;i < end;i++) {
        if (i % 4 === 0 && i >= 4)
            html += `</div><div class='row'>`;
        html += `<div class="col-sm-3">
                    <a class="cbp-vm-image" href="./single.html">
                        <div class="inner_content">
                            <div class="product_image" style='margin: 10%'>
                                <img src="images/${listBooks[i][0].code}.jpg" class="img-responsive" alt="" style='width: 300px; height: 330px;'/>
                                <div class="product_container">
                                    <div class="cart-left">
                                        <p class="title">${listBooks[i][1].name}</p>
                                    </div>
                                    <div class="mount item_price price">${listBooks[i][1].exportPrice}đ</div>
                                    <i class="mount sell_number">Đã bán: ${listBooks[i][1].sellNumber}</i>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>`
    }
    html += '</div>';
    $("#listBooksForAdmin").html(html);
}

