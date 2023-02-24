const User = require("../models/UserSchema");
const Chat = require("../models/ChatSchema");
const sendToken = require("../utils/jwtToken.js");


//  Register User
exports.registerUser = async(req,res,next)=>{
    try{
        const {name , email  , password , avatar} = req.body;
        if(!name || !email || !password || !avatar){
            return await res.status(400).send({ success : false ,message  : "Please fill in all the details"})
        }
        const user = await User.create({name , email , password , avatar})
        sendToken(user , 201 , res);
    }catch(err){
        return await res.status(500).send({success : false , message : err.message})
    }
}



// Login User
exports.loginUser  = async(req,res,next)=>{
    try{
        const {email  , password} = req.body;
        if(!email || !password){
            return await res.status(400).send({success : false , message : "Please fill in all the details"})
        }
        const user = await User.findOne({email}).select("+password")
        if(!user){
           return await res.status(400).json({success:false , message : "Invalid Email or Password"})
        }
        
        const isMatch = await user.matchPassword(password);
        if(!isMatch){
            return await res
            .status(400)
            .json({ success: false, message: "Invalid Email or Password" });     
           }
           (await user.populate('chats'))
            await user.populate('followers');
            await user.populate('following');
           sendToken(user , 200 , res);

    }catch(err){
        await res.json({ success: false, message: err.message });
    }
}



//  Logout User

exports.logout = async(req,res,next)=>{
    try{

        await res.cookie("token" , null  ,{
            expires : new Date(Date.now()),
            httpOnly : true
        } )

       return await res
        .status(200)
        .json({ success: true, message: "Logged Out successfully" });

    }catch(err){
        return await res.status(401).send({success : false , message : err.message})
    }
}


//  Update user details

exports.updateUser = async(req,res,next)=>{
    try{
        const userData = {
            name : req.body.name,
            email : req.body.email,
            avatar : req.body.avatar,
        }
        const user = await User.findByIdAndUpdate(req.body._id  , userData , {
            new : true,
            runValidators : true,
            useFindAndModify : true
        })
        return await res.status(200).send({success:true , user})
    }catch(err){
        return await res.status(401).send({success : false,message:err.message})
    }
}

// Get User Details
exports.getUserDetails = async (req, res, next) => {
    try {
      const cookie = req.headers.cookie;
      if (!cookie) {
        await res
          .status(404)
          .send({ success: false, message: "You have already Logged in !" });
        return ;
      }
  
      const user = await User.findById(req.user.id);
  
     return await res.status(200).json({
        success: true,
        user,
      });
    } catch (err) {
     return await res.status(400).send({ success: false, message: err.message });
    }
  };
 
  
//   Update Password

exports.updatePassword = async(req,res,next)=>{
    try{
        const {oldPassword , confirmPassword , newPassword , _id} = req.body;
        // const user = await User.findById(req.user.id).select("+password")
        const user = await User.findById(_id).select("+password")
        const isMatch = await user.matchPassword(oldPassword);
            if(!isMatch){
                return await res.status(201).send({success : false  , message : "Old Password is Incorrect"})
            }

            if(oldPassword == newPassword){
                return await res.status(400).send({success:false , message : "Old Password can not be same as New Password"})
            }
            if(newPassword != confirmPassword){
                return await res.status(201).send({success:  false , message : "New password is not same as Confirm password"})
            }
            user.password = req.body.newPassword;
            await user.save()
           sendToken(user,200,res)
        
    }catch(err){
        return await res.status(401).send({success : false , message : err.message})
    }
}


//  Find All users ---> Search Functionality
exports.findUsers = async(req,res,next)=>{

    try{
        const {keyword , _id} = req.body;
        const users =await User.find({$and : [ {$ne : {_id : _id }}, {$contains : {name  : keyword } }]})
        return await res.status(200).send({success:true , users})

    }catch(err){
        return await res.status(400).send({success : false , message : err.message})
    }
}


//  Delete Account

exports.deleteAccount = async(req,res,next)=>{

    try{
            const {id} = req.body;
            await User.findByIdAndDelete(id);

            return await res.status(200).send({success : true , message : "Account Deleted Successfully"})


    }catch(err){
        return await res.status(400).send({Success : false , message  : err.message})
    }
}


