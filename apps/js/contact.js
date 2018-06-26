$('#contact_form').submit(function(event) {
    let name = $('#name').val();
    let email = $('#email').val();
    let message = $('#message').val();

    let obj = {
        name,
        email,
        message
    }

    try {
        $.post('http://localhost:1001/Contact', 
        JSON.stringify(obj),
        (data) => {
            location.reload();
            return true;
        },
        'text'
        )
    }
    catch (err) {
        console.log(err);
    }
   
})