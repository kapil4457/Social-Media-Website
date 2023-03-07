const Post = require('../models/PostSchema')

exports.createPost = async(req,res,next)=>{

    try{

        const {description , isImage , link , _id  } = req.body;
        const post = await Post.create({description , isImage , link , owner : _id });
       return await  res.status(201).send({success : true , post})

    }catch(err){
        return await res.status(400).send({success : false , message : err.message})
    }
}


exports.updatePost = async(req,res,next)=>{
    try{
        const {description , _id } = req.body;
        const updatedData = {
            description : description
        }
        const updatedPost = await Post.findByIdAndUpdate(_id ,updatedData ,{
            new : true,
            runValidators : true,
            useFindAndModify : true
        })
        return await res.status(200).send({success : true , updatedPost})

    }catch(err){
        return await res.status(400).send({success : false  , message : err.message})
    }
}

exports.deletePost = async(req,res,next)=>{
    try{
        const {_id} = req.body;
        await Post.findByIdAndDelete(_id)
        return await res.status(200).send({success : true , message : "Post deleted successfully"})

    }catch(err){
        return await res.status(400).send({success : false , message : err.message})
    }
}