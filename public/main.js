const socket = io();
let recId;
$('#divChat').hide();

// $('#divChat p').click(function() {
//     console.log($(this).text());
// });
$('#divUsers').on('click', 'p', function() {
    $('#divUsers p').removeClass('active');
    $(this).addClass('active');
    const preId = $(this).attr('id');
    recId = preId.substring(3);
});

$('#btnSignIn').click(() => {
    const username = $('#txtUsername').val();
    socket.emit('CLIENT_SIGN_IN', username);
    $('#txtUsername').val(''); 
});

$('#btnSend').click(() => {
    const message = $('#txtMessage').val();
    socket.emit('CLIENT_SEND_MESSSAGE', message);
    $('#txtMessage').val('');
});

$('#btnSendPrivate').click(() => {
    if (!recId) return alert('Please choose a user');
    const message = $('#txtMessage').val();
    socket.emit('CLIENT_SEND_PRIVATE_MESSSAGE', { message, recId });
    $('#txtMessage').val('');
});

socket.on('SERVER_SEND_MESSSAGE', message => {
    $('#divMessages').append(`<p>${message}</p>`);
});

socket.on('SIGN_IN_CONFIRM', isSuccess => {
    if (!isSuccess) return alert('Username da ton tai');
    $('#divChat').show();
    $('#divSignIn').hide();
    socket.on('NEW_USER', user => {
        $('#divUsers').append(`<p id="si-${user.id}">${user.username}</p>`)
    }); 
});

socket.on('USERS_DATA', users => {
    users.forEach(user => $('#divUsers').append(`<p id="si-${user.id}">${user.username}</p>`))
});

socket.on('USER_DISCONNECT', user => {
    $(`#si-${user.id}`).remove();
});

/*
    1. Set su kien cho cac the p tring divRooms - active style
    2. Emit su kien join room cho server
    3. Moi client o trong 1 room duy nhat - Neu da ton tai, leaveRoom
    4. Them button sendRoom
*/
