const socket = io();

$('#divChat').hide();

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


// setInterval(() => {
//     socket.emit('CLIENT_SEND_MESSSAGE', Math.random());
// }, 1000);
socket.on('USER_DISCONNECT', user => {
    $(`#si-${user.id}`).remove();
});
