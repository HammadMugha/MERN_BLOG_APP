const mongoose = require("mongoose");

const userShema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String || Number,
        required:true
    },
    cover:{
        type:String
    }

},{timestamps:true})
const User = new mongoose.model("user", userShema);
module.exports = User