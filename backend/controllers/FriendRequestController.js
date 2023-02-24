const FriendRequest = require('../models/FriendRequestSchema')

exports.sendFriendRequest = async(req,res,next)=>{
    try{

        const {from  , to} = req.body;
     const request =    await FriendRequest.create({from , to});
     res.status(201).send({success : true  , request})


    }catch(err){
        res.status(400).send({success : false  , message : err.message})
    }
}

exports.acceptFriendRequest = async(req,res,next)=>{
    try{
        const {friendRequest} = req.body;
      const request =   await FriendRequest.findById(friendRequest);
      await request.acceptFriendRequest()

        res.status(200).send({success : true , message : "Friend Request Accepted Successfully"})

    }catch(err){
        res.status(400).send({success : false , message  :err.message})
    }
}