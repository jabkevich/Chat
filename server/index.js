var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http,{
    cors:{
        origin: "*"
    }
});

const port = 6900;


let usersRooms = []
let users = []
let rooms = {}

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
    socket.on("open_room", data=>{
        console.log(socket.id)
        if(!rooms[data.room])
            rooms[data.room] = [data.username]
        else
            rooms[data.room] = [...rooms[data.room], data.username]
        socket.join(data.room);
        io.to(data.room).emit("open_room")
    })

    socket.on("new_message", data =>{
        io.to(data.room).emit("new_message", {message: data.message, username: data.usernmae})
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