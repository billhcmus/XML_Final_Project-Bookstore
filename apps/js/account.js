let session = localStorage.getItem('session');
let name = localStorage.getItem('name');

if (session) {
    $('#btn_login').hide();
    $('#name_user').show();
    $('#btn_logout').show();

    $('#name_user').text(`Chào, ${name}`);
    if (localStorage.getItem('name') == 'Huỳnh Trọng Thoại')
        $('#name_user').attr('href', '/admin.html');
    else
        $('#name_user').attr('href', '/employee.html');
}
else {
    $('#btn_login').show();
    $('#name_user').hide();
    $('#btn_logout').hide();
}