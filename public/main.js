const socket = io();

// $('#btnShow').click(() => console.log(Math.random()));

// $('#btnShow').click(() => {
//     $('body').append(`<p style="color: red">${Math.random()}</p>`);
// });

// $('#divMessages p').click(function() {
//     $('#divMessages p').removeClass('active');
//     $(this).addClass('active');
// });

$('#btnSend').click(() => {
    const message = $('#txtMessage').val();
    console.log(message);
    $('#txtMessage').val('');
});
