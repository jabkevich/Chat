var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http,{
    cors:{
        origin: "*"
    }
});

const port = 7000;


let usersRooms = []
let users = []
let rooms = {}
let messages = []

const getVisitors = () => {
    return users;
};

const emitVisitors = () => {
    io.emit("visitors", getVisitors());
};

io.on("connection", function(socket) {
    console.log("a user connected");

    socket.on("new_user", user => {
        users = [...users, {username: user, socketId: socket.id}];
        io.emit("helloNewUser", user);
    });

    socket.on("get_users", ()=> {
        console.log(socket.id)
        io.emit("get_users", users);
    });
    socket.on("disconnect", function() {
        socket.disconnect()
        console.log("user disconnected");
    });

    socket.on("new_room", (data)=>{
        usersRooms = [...usersRooms, data]
        io.emit("get_rooms", usersRooms);
    })
    socket.on("join_room", data=>{
        console.log(socket.id)
        if(!rooms[data.room])
            rooms[data.room] = [data.username]
        else
            rooms[data.room] = [...rooms[data.room], data.username]
        socket.join(data.room);
        io.to(data.room).emit("join_room", {username:data.room, username: data.username})
    })

    socket.on("send_message", data =>{
        messages = [...messages, data]
        io.to(data.room).emit("get_new_message", {message: data.message, room: data.room, username: data.username})
    })
    socket.on("get_messages", data=>{
        console.log("hm")
        io.to(data.room).emit("get_messages", messages)
    })

    socket.on("get_rooms", ()=>{
        io.emit("get_rooms", usersRooms);
    })
    socket.on("close_room", (data)=>{
        console.log("close_room")
        socket.leave(data.room)
    })
});

http.listen(port, function() {
    console.log(`listening on *:${port}`);
});