const Post = require('../models/PostSchema')

exports.createPost = async(req,res,next)=>{

    try{

        const {description , isImage , link   } = req.body;
        const post = await Post.create({description , isImage , link});
        res.status(201).send({success : true , post})

    }catch(err){
        res.status(500).send({success : false , message : err.message})
    }
}