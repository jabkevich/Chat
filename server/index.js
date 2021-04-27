var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http,{
    cors:{
        origin: "*"
    }
});

const port = 6600;


let rooms = []
let users = []

const getVisitors = () => {
    return users;
};

const emitVisitors = () => {
    io.emit("visitors", getVisitors());
};

io.on("connection", function(socket) {
    console.log("a user connected");

    socket.on("new_user", user => {
        console.log("new_visitor", user);
        console.log(socket.id)
        users = [...users, user];
        io.emit("helloNewUser", user);
    });

    socket.on("get_users", ()=> {
        console.log("get users")
        io.emit("get_users", users);
    });
    socket.on("disconnect", function() {
        emitVisitors();
        console.log(socket.id)
        console.log("user disconnected");
    });

    socket.on("new_room", (data)=>{
        rooms = [...rooms, data]
        console.log(data.name)
        console.log("get users")
        // socket.join(data.name);
        io.emit("get_rooms", rooms);
    })
    socket.on("open_room", data=>{
        socket.join(data);
        io.to(data).emit("open_room")
    })

    socket.on("new_message", data =>{
        io.to(data.room).emit("new_message", {message: data.message, username: data.usernmae})
    })

    socket.on("get_rooms", ()=>{
        console.log("get_rooms")
        io.emit("get_rooms", rooms);
    })
});

http.listen(port, function() {
    console.log(`listening on *:${port}`);
});