const express = require("express")
const { registerUser, loginUser } = require("../controllers/userController")
const { createBlogs, getAllBlogs, getSingleBlog, updateBlog,deleteBlog,getUserBlogs,getUserBlogsById } = require("../controllers/blogsController")
const router = express.Router()
const multer  = require('multer')
const { userValid } = require("../middlewares/authMiddleware")
const upload = multer({ dest: 'uploads/' })
//Create-Blogs API
router.post("/createblog",upload.single('file'),userValid,createBlogs)
//Get-all Blogs API
router.get("/allblogs",getAllBlogs)
//getSingle API
router.get("/getsingleblog/:id",getSingleBlog)
//update-blog API
router.put("/updateblog/:id",upload.single('file'),userValid,updateBlog)
//delete-blog API
router.delete("/deleteblog/:id",deleteBlog)
//Get LoginUserBlogs api
router.get("/getuserblogs",userValid,getUserBlogs)
//Get LoginUserBlogs by params id api || ismein hm basically just frontend se userId params ke thorough send krain gay or woh id agr match hoti ha created blogs wali id se toh woh blogs get kraingy
router.get("/getsingleuserblogs/:id",getUserBlogsById)



module.exports = router