var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http,{
    cors:{
        origin: "*"
    }
});

const port = 7000;


let room = []
let users = []
let rooms = []
let messages = []

const getVisitors = () => {
    return users;
};

const emitVisitors = () => {
    io.emit("visitors", getVisitors());
};

io.on("connection", function(socket) {

    socket.on("new_user", user => {
        users = [...users, {username: user, socketId: socket.id}];
        io.emit("helloNewUser", {username: user, socketId: socket.id});
    });
    socket.on("disconnect", function() {
        // let disUser
        // console.log("--------------------")
        // console.log(users)
        users = users.filter(user=> {
            if(user.socketId !== socket.id)
                disUser = user.socketId
            return user.socketId !== socket.id
        })
        // console.log(disUser)
        // console.log(room)
        // if(room){
        //    room.filter(user =>{
        //        if(user.socketId === disUser){
        //            disUser = user.socketId
        //        }
        //    })
        // }
        // console.log(disUser)

        io.emit("get_users", users);
        socket.disconnect()
    });

    socket.on("get_users", ()=> {
        io.emit("get_users", users);
    });

    socket.on("new_room", (data)=>{
        rooms = [...rooms, data]
        io.emit("get_rooms", rooms);
    })
    socket.on("join_room", data=>{
        console.log("join_room")
        room = [...room, {room: data.room, user: data.user}]
        socket.join(data.room);
        io.to(data.room).emit("join_room", {room:data.room, user: data.user})
    })

    socket.on("send_message", data =>{
        messages = [...messages, data]
        io.to(data.room).emit("get_new_message", {message: data.message, room: data.room, username: data.username})
    })
    socket.on("get_messages", data=>{
        io.to(data.room).emit("get_messages", messages)
    })

    socket.on("get_rooms", ()=>{
        io.emit("get_rooms", rooms);
    })
    socket.on("leave_room", (data)=>{
        console.log("leave_room")
        console.log(room)
        console.log("--------------")
        room = room.filter(user => user.socketId !== data.user.socketId)
        console.log("--------------")
        console.log(room)
        io.to(data.room).emit("get_participants", room)
        socket.leave(data.room)
    })
    socket.on("get_participants", chat=>{
        io.to(chat).emit("get_participants", room)
    })


});

http.listen(port, function() {
    console.log(`listening on *:${port}`);
});