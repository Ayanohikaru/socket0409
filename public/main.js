const socket = io();

$('#btnSend').click(() => {
    const message = $('#txtMessage').val();
    socket.emit('CLIENT_SEND_MESSSAGE', message);
    $('#txtMessage').val('');
});

socket.on('SERVER_SEND_MESSSAGE', message => {
    $('#divMessages').append(`<p>${message}</p>`);
});
// setInterval(() => {
//     socket.emit('CLIENT_SEND_MESSSAGE', Math.random());
// }, 1000);
