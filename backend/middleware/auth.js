const jwt = require('jsonwebtoken')
const User = require('../models/UserSchema')


exports.isAuthenticatedUser = (async(req,res,next)=>{
    try{
        const {token} = req.cookies;
        if(!token){
            return res.status(401).send({success:false , message : "Please login to access this page"})
        }

        const decodedData = jwt.verify(token , process.env.JWT_AUTH);
        req.user = await User.findById(decodedData.Id)
        next()

    }catch(err){
        res.status(500).send({success : false , message : err.message})
    }
})



exports.authorizeRole = (...role)=>{
    return (req,res,next)=>{
        if(!role.includes(req.user.role)){
                res.status(403).send({success:false , message : `Role : ${req.user.role} is not allowed to access this resource`})
                return;
        }else{
            next()
        }
    }
}
