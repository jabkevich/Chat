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
*   [
*       {
*          "user": {"socketId": "", "username":""}
*          "message": ""
*       }
*   ]
* }
* */
let messages = {}


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

        console.log("join_room")
        console.log(data)
        console.log(rooms)
        let flag = false
            rooms.filter(room => {
            if (room.id === data.room){
                flag = true
            }
        })
        console.log(flag)
        if(flag) {
            socket.join(data.room)
            io.to(data.room).emit("join_room", data)
        }
        else{
            console.log("dada")
            io.to(socket.id).emit("exist_room")
        }

    })
    socket.on("leave_room", (data)=>{
        console.log("leave_room")
        delete chats[data.room]
        io.to(data.room).emit("leave_room", data.user)
        socket.leave(data.room)
    })
    socket.on("send_message", data=>{
        if( data.room in messages){
            messages[data.room].push({user: data.user, message: data.message})
        }
        else{
            messages[data.room] = []
            messages[data.room].push({user: data.user, message: data.message})
        }
        io.to(data.room).emit('send_message', {room: data.room, message: {user: data.user, message: data.message}})
    })
    socket.on("get_messages", room=>{
        if(room in messages)
            io.to(room).emit('get_messages', {room: room, messages: messages[room]})
    })
});

http.listen(port, function() {
    console.log(`listening on *:${port}`);
});