const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    owner : {
type : mongoose.Schema.Types.ObjectId,
ref : "User"
    },
    isImage  :{
        type : Boolean,
        required : true
    },
    link : {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    description : {
        type :String,
        required : true,
    },
    likes:{
        type : Number,
        default : 0
    },
    comments : [
        {
            descripton : {

                type:String,
            },
            user  : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "User"
            }
        }
    ]
})


const Post = mongoose.model('Post' , postSchema)
module.exports = Post