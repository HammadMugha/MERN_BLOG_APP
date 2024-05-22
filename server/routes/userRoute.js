const express = require("express")
const { registerUser, loginUser,getAllUsers } = require("../controllers/userController.js")
const { userValid } = require("../middlewares/authMiddleware.js")
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const router = express.Router()

//Register User API
router.post("/register",upload.single('file'),registerUser)
//Login User API
router.post("/login",loginUser)

router.get("/authenticuser", (req,res)=>{
    res.status(200).json({ok:true})
 })

 // LOGOUT USER
router.get("/logout",(req,res)=>{
    res.clearCookie("token")
    return res.json("Success")
})

 // LOGOUT USER
 router.get("/getallusers",getAllUsers)
module.exports = router