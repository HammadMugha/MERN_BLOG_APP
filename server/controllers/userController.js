const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const secretKey = "jwtkey12345678jjahsjas686"
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const fs = require("fs")
//REGISTER API
const registerUser = async (req,res) => {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
    try {
        const {name,email,password} = req.body
        console.log(req.body)
    if(!name || !email || !password){
      return res.send({message:"all fields required"})
    }
    // agr user already register ha
    const exist = await userModel.findOne({email:email})
    if(exist){
        return res.send({message:"user already register"})
    }else{
        const hash = await bcrypt.hash(password,10)
       const user = await userModel.create({ name, email, password:hash,cover: newPath })
       const store = await user.save()
       return res.status(201).json({success:true,message:"User created Successfully",store})
    }
    } catch (error) {
        console.log("error");
        console.log(error);
        res.json({success:false,
            error})
    }
}


//LOGIN API
const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body
   
        if(!email,!password){
        return res.send({message:"email and password required"})
       }

    const registerUser = await userModel.findOne({email:email})
    if(registerUser){
        const passMatch = await bcrypt.compare(password,registerUser.password)
        if(!passMatch){
            return res.send({message:"password not match"})
        }else{
           const token = jwt.sign({id:registerUser._id},secretKey,{expiresIn:'1d'})
        // const token = await registerUser.generateToken()
        //    res.cookie("token",token)
        //    console.log(token);
        //    return res.status(201).json({status:201,user:registerUser,token:token})
           res.status(201).cookie("token", token,{ httpOnly: true }).json({
            success: true,
            user:registerUser,token:token
          });
        }
    }
    } catch (error) {
        console.log("error");
        console.log(error);
        res.json({success:false,
            error})
    }
}


//get all users api
const getAllUsers = async (req, res) => {
    try {
        const users= await userModel.find({})
        res.status(200).json({success:true,message: "get all users successfully",users})
    } catch (error) {
        console.log("error");
        console.log(error);
        res.json({success:false,
            error})
    }
}

module.exports = {registerUser,loginUser,getAllUsers}