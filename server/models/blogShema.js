const mongoose = require('mongoose')

const blogsShema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    comment:{
        type: String || Number,
        required: true
    },
    cover:{
        type: String,
    },
    views:{
        type: Number,
        default: 0
    },
    author:{type: mongoose.Schema.Types.ObjectId, ref:'user'},
})

const Collection1 = new mongoose.model("recipe",blogsShema)

module.exports = Collection1