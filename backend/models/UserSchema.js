const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema =new mongoose.Schema({
name : {
    type:String,
    required:true
},
email : {
    type : String,
    required: true,
    unique : true
},
password : {
    type : String,
    required : true,
},
avatar: {
    public_id: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },

},
followers :[
    {
    type : mongoose.Schema.Types.ObjectId,
    ref:"User"
}
]
,
following :[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
]
,
chats : [
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Chat"
    }

]
},
{
    timestamps:true
})


userSchema.pre("save" , async function(next){
    if(!this.isModified){
        next();
    }
    
    const salt = await bcrypt.genSalt(10);
    
    this.password =  await bcrypt.hash(this.password , salt)
    })

    
    
    userSchema.methods.matchPassword = async function(pass){
    
        return await bcrypt.compare(pass,this.password)
    }

    userSchema.methods.getJWTTokens = function () {
        return jwt.sign({ id: this._id }, process.env.JWT_AUTH, {
            expiresIn: process.env.EXPIRE_KEY,
        });
    };
    

const User = mongoose.model('User' , userSchema)

module.exports = User;
