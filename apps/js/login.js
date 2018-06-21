
$('#form_submit').submit(()=>{
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
        let obj = {
            username,
            password
        }
        try {
            $.post('http://localhost:1001/Login',
                JSON.stringify(obj),
                (data) =>  {
                    if (data) {
                        var xmlObj = JSON.parse(data);
                        let position = xmlObj.position;
                        if (position == 'admin')
                            location.href = '/admin.html';
                        else
                            location.href = '/nhanvien.html';
                    }
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