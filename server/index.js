const express =  require("express")
const mongoose =  require("mongoose")
const cors =  require("cors")
const cookiParser = require("cookie-parser")
const router = require('./routes/userRoute');
const blogrou = require('./routes/blogsRoute');
const commentRoute = require('./routes/commentRoute');
// import connection from "./models/mongodb.js"
const port = process.env.PORT || 8000
const app = express()
app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cookiParser())
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}))
app.use("/api",router)
//BLOGS ROUTE
app.use("/api",blogrou)
//Comments ROUTE
app.use("/",commentRoute)
//Moongose Connect
mongoose.connect('mongodb://localhost:27017/Blog')
.then(()=> {
    console.log('connection successful')
}).catch(()=> {
    console.log('connection unvalid')
})

//mongodb connection
// connection()
//creating server
app.listen(port,()=>{
    console.log("listening on port " + port)
})