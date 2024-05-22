const secretKey = "jwtkey12345678jjahsjas686"
const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")
const userValid = async(req,res,next)=>{
  try {
    const token = req.cookies.token
    if(!token) {
      res.json("The token is wrong")
    }
    const decode = jwt.verify(token,secretKey)
  req.user = await userModel.findById(decode.id);
  next();
} catch (error) {
  console.log(error);
}
  }

  module.exports = {userValid}