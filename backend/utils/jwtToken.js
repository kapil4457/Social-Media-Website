const sendToken = (user,statusCode,res)=>{
    const token = user.getJWTTokens();

    const option = {
        expires : new Date(Date.now()+ 30*24*60*60*1000),
        httpOnly : true
    }

    return res.status(statusCode).cookie('token' , token , option).json({success:true,user})
}
module.exports = sendToken

