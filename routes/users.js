var mongoose = require("mongoose")
var plm = require("passport-local-mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/major")

var userSchema = mongoose.Schema({
  username : String,
  password : String,
  pic: {
    type:String,
    default: "def.jpg"
  },
  friends : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }],
  chats : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }],
  currentSocket : String
})

userSchema.plugin(plm)

module.exports = mongoose.model("user", userSchema)