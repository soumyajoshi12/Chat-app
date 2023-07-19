const io = require("socket.io")();
const socketapi = {
  io: io,
};

const user = [];

io.on("connection", function (socket) {
    console.log("A user connected");
    socket.on("newUser", function (name) {
        user.push(name);
        console.log(user);
    socket.broadcast.emit("user-joined", name);
    io.emit("allusers", user);
  });
});

module.exports = socketapi;
