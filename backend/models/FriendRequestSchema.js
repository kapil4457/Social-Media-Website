const mongoose = require('mongoose')
const User = require("./UserSchema")
const friendRequestSchema = new mongoose.Schema({

    from : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    to : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }

})


friendRequestSchema.pre("save" , async function(next){

       const fromUser = await User.findByIdAndUpdate(this.from , 
        {
        $push : {following : this.to}
    },
    {
        new : true
    })
    const toUser = await User.findByIdAndUpdate(this.to , 
        {
            $push : {followers  : this.from}
        },
        {
            new : true
        }
        )
    next()
  

})


const FriendRequest = mongoose.model('FriendRequest' , friendRequestSchema)

module.exports = FriendRequest;