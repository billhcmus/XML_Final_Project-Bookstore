
$('#btn_login').click(()=>{
    let username = $('#username').val();
    let password = $('#password').val();
    let error = $('#error_login');
    if (!username) {
        error.text('Username không đúng định dạng');
        return false;
    }
    else if (!password) {
        error.html('Password không đúng định dạng');
        return false;
    }
    else {
        try {
            $.post('http://localhost:1001/Login',
                JSON.stringify({
                    username,
                    password
                }),
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
    }

})