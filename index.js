const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => res.render('home'));
server.listen(3000, () => console.log('Server started!'));

class User {
    constructor(id, username) {
        this.id = id;
        this.username = username;
    }
}

const users = [];

io.on('connection', socket => {
    console.log(socket.id);
    // setInterval(() => {
    //     socket.emit('SERVER_SEND_MESSSAGE', Math.random());
    // }, 1000);
    socket.on('CLIENT_SEND_MESSSAGE', message => {
        io.emit('SERVER_SEND_MESSSAGE', 'You: ' + message);
    });
});

require('reload')(app);

// 1. Clien gui thong tin dang nhap
// 2. Kiem tra ton tai username
// 3. Neu ton tai thi alert('Usename da ton tai')
// 4. Neu chua ton tai thi dk thanh cong -> hide divSignIn, show divChat
// 5. Push user vao mang user
