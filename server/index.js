var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http,{
    cors:{
        origin: "*"
    }
});

const port = 7000;

/*
*
* stores a list of users and socket id
* [
* {
*   socketId: username
* }
* ]
*
* */
let users = []

/*
* stores the id of the room, and the list of users
* roomID = "name" + socketId - user who created room
* [
*   {
*       "roomId": ""
*       "roomName": "",
*       "user": {
*           socketId:"",
*           username: ""
*       },
*   }
* ]
*
* */
let rooms = []


let chats = {}
/*
* stores the room id and messages
* {
*   "roomId":
*   {
*       {
*          "user": {"socketId": "", "username":""}
*          "message": ""
*       }
*   }
* }
* */
const messages = []


io.on("connection", function(socket) {
    socket.on("login", user => {
        users= [...users, {socketId: socket.id, username: user}]
        socket.emit("login",  {username: user, socketId:socket.id})
        io.to(socket.id).emit("get_users", users)
        socket.broadcast.emit("new_user",  {socketId: socket.id, username: user});
    });
    socket.on("disconnect", ()=>{
        users = users.filter(user => user.socketId !== socket.id)
        io.emit("user_disconnected", socket.id)
    })
    socket.on("new_room", data=>{
        rooms = [...rooms, data]
        io.emit("new_room", data)
    })
    socket.on("get_rooms", ()=>{
        io.emit("get_rooms", rooms)
    })
    socket.on("join_room", (data)=>{
        chats[data.room] +=  data
        socket.join(data.room)
        console.log("join_room")
        console.log(data)
        io.to(data.room).emit("join_room", data)
    })
    socket.on("leave_room", (data)=>{
        console.log("leave_room")
        console.log(chats)
        console.log(data)
        delete chats[data.room]
        console.log(chats)
        io.to(data.room).emit("leave_room", data.user)
        socket.leave(data.room)
    })

});

http.listen(port, function() {
    console.log(`listening on *:${port}`);
});