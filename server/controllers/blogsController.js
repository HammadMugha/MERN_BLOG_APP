const blogModel = require("../models/blogShema");
const userModel = require("../models/userModel");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const fs = require("fs")
//Create-Blogs API
const createBlogs = async (req, res) => {
  const { title, description, comment } = req.body;
  const {originalname,path} = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path+'.'+ext;
  fs.renameSync(path, newPath);
  try {
    if (!title || !description || !comment) {
      return res.send({ message: "all fields required" });
    } else {
      const checkUser = await userModel.findById(req.user._id)
      if(!checkUser){
        res.status(404).json({
          success:false,
          message:"user not valid"
        })
      }
      await blogModel
        .create({
          title: title,
          description: description,
          comment: comment,
          cover: newPath,
          author:checkUser
        })
        .then((object) => {
          res
            .status(201)
            .json({
              success: true,
              message: "blog created successfully",
              object,
              data:req.file
            });
        })
        .catch((err) => {
          res.json(err);
        });
    }
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ success: false, message: "error in blog api", error });
  }
};

//Get-all Blogs API
const getAllBlogs = async (req, res) => {
  try {
    const query = req.query
    const searchBlogs = {
      title:{
        $regex:query.search,$options:"i"
      }
    }
    const blogs = await blogModel.find(query.search?searchBlogs:null).populate('author')
    .sort({createdAt: -1})
    .limit(20)
    return res
      .status(201)
      .json({ success: true, message: "getall blogs successfully", blogs });
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ success: false, message: "error in getallblogs api", error });
  }
};

//getSingle API
const getSingleBlog = async (req, res) => {
  try {
    // blog.views =+1
    const blog = await blogModel.findById(req.params.id);
    return res
      .status(200)
      .json({ success: true, message: "get-single blog successfully", blog });
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ success: false, message: "error in getsingle api", error });
  }
};

//update-blog API
const updateBlog = async (req, res) => {
  const { title, description, comment } = req.body;
  const {originalname,path} = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path+'.'+ext;
  fs.renameSync(path, newPath);
  try {
    // const {title,description,comment} = req.body;
    //check user
    const checkUser = await userModel.findById(req.user._id)
      if(!checkUser){
        res.status(404).json({
          success:false,
          message:"user not valid"
        })
      }
    const update = await blogModel.findByIdAndUpdate(
      req.params.id,
      { title: title, description: description,comment:comment,cover:newPath,author:checkUser },
      { new: true }
    );
    return res.status(200).json({
      success:true,
      message: "blog updated successfully",
      update
    })
    
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ success: false, message: "error in blog updated", error });
  }
};

//Delete-Blogs API
const deleteBlog = async (req,res)=>{
    try{
        const id = req.params.id;
        const Delete = await blogModel.findByIdAndDelete(id);
        return res.status(200).json({success:true,
        message:"delete blog successfully",Delete})
    }catch (error) {
        console.log(error);
        res
          .status(404)
          .json({ success: false, message: "error in delete blog", error });
      }
}

//Get-User-Blogs with id of user API
const getUserBlogs = async(req,res)=>{
  try{
    // const id = req.params.id;
    const blogs = await blogModel.find({author:req.user});
    return res.status(200).json({success:true,
    message:"get user blogs successfully",blogs})
}catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ success: false, message: "error in get user blogs", error });
  }
}



//Get-User-Blogs with paramsId get all blogs only login user was created api
const getUserBlogsById = async(req,res)=>{
  try{
    // const id = req.params.id;
    const blogs = await blogModel.find({author:req.params.id});
    return res.status(200).json({success:true,
    message:"get user blogs successfully",blogs})
}catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ success: false, message: "error in get user blogs", error });
  }
}







//like blog with blog paramsId recieve from frontend when user click the blog and send id
// blogController.put('/likeBlog/:id', verifyToken, async (req, res) => {
//   try {
//       const blog = await Blog.findById(req.params.id)
//       if(blog.likes.includes(req.user.id)){
//           blog.likes = blog.likes.filter((userId) => userId !== req.user.id)
//           await blog.save()

//           return res.status(200).json({msg: 'Successfully unliked the blog'})
//       } else {
//           blog.likes.push(req.user.id)
//           await blog.save()

//           return res.status(200).json({msg: "Successfully liked the blog"})
//       }

//   } catch (error) {
//       return res.status(500).json(error)
//   }
// })

module.exports = {createBlogs,getAllBlogs,getSingleBlog,updateBlog,deleteBlog,getUserBlogs,getUserBlogsById}
