let express = require("express");
let app = express();
let http =require('http').Server(app);
let io = require("socket.io")(http);
let _ = require("underscore");
let bodyParser = require("body-parser");

http.listen(2000);
app.use(bodyParser());
app.use(express.static(process.cwd() + '/public'));
app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/public/client.html');
});

io.on('connection', (socket) => {
    socket.join('room');
    socket.on('newUser', (data) => {
        socket.nickname = data;
        socket.to('room').emit('message',data + "connected");
    });
    socket.on('new', (data) => {
        io.to('room').emit('message',data,socket.nickname);
    });
});



