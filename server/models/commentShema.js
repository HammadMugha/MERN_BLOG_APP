const mongoose = require("mongoose");

const commentShema = new mongoose.Schema({
    comment:{
        type:String,
        required:true,
        trim:true
    },
    postId:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true
    }

},{timestamps:true})
const Comment = new mongoose.model("comment", commentShema);
module.exports = Comment