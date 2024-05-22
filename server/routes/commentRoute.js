const express = require('express');
const Comment = require('../models/commentShema');
const { userValid } = require('../middlewares/authMiddleware');
const router = express.Router();


//for posting comment route api
router.post("/api/comments",userValid, async(req, res)=> {
  try {
    const postComment = await Comment.create(req.body)
    const savedComment = await postComment.save()
    res.status(200).json({
        success:true,
        message: "post comment saved successfully",
        savedComment
    })
  } catch (error) {
    res.status(404).json({
        success:false,
        message: "Error posting comment api",
        error
    })
  }
})


//for get-all-comment route api according to postId when user click to any blog frontend se hm ussi blog ki id send kraingy or db mein us id se miltay hue comments find kray gay
router.get("/api/comments/:postid",userValid, async(req, res)=> {
  try {
    const allComments = await Comment.find({postId: req.params.postid})
    res.status(200).json({
        success:true,
        message: "getAll comments successfully",
        allComments
    })
  } catch (error) {
    res.status(404).json({
        success:false,
        message: "Error posting comment api",
        error
    })
  }
})
module.exports = router