//Node server which will connect socket with io.

const socket = require('socket.io');

const io=require('socket.io')(8000);//socket.io is a server of HTTP instance. 
const users={};

io.on('connection', socket=>{//socket.io instance.
    socket.on('new-user-joined', name=>{
        // console.log("new user "+name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    })

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]});
    })
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })
})