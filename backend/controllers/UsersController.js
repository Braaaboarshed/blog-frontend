const asyncHandler =require('express-async-handler');
const {User, validateUpdateUser} = require('../models/User') ;
const bcrypt = require('bcryptjs')
const path = require("path");
const  fs = require("fs")
const {Post} = require("../models/Post");
const {Comment} = require("../models/Comment")

const { 
    cloudarniryUploadImage,
    cloudarniryDeleteImage,
    cloudarniryDeleteMutableImages
} = require('../utils/cloudirany');

module.exports.getAllUsersCtrl= asyncHandler(async(req,res)=>{

   
        
        const users = await User.find();
        res.status(200).json(users)
    

})

module.exports.getUserByIdCtrl = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id).select("-password").populate("posts");
    if(!user){

        res.status(404).json({message:"user not found"})
    }
    else{
        res.status (200).json(user)
    }
})

module.exports.updateUserCtrl = asyncHandler(async(req,res)=>{
    const{error} = validateUpdateUser(req.body)
    console.log(req.body)
    if(error){
        res.status(400).json({message:error.details[1].message})
    }
    if(req.body.password){
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password,salt)
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id,{
        $set :{
            username : req.body.username,
            password : req.body.password,
            bio      : req.body.bio,
        

        }
    },{new :true}).select("-password")
    res.status(200).json(updatedUser)
})

module.exports.profilePhotoUploadCtrl=asyncHandler(async(req,res)=>{
    // 1-validation
    if(!req.file){
        res.status(400).json({message:"no file attached"})
    }
    // console.log(req.file)
 
    // 2-get the path of the image 
    const imagePath = path.join(__dirname,`../images/${req.file.filename}`)

    //  3-upload to the cloudarniry
    const result = await cloudarniryUploadImage(imagePath)
    console.log(result)
    // 4-get the user from db
    const user = await User.findById(req.user._id)
    // 5- delete the old photo if it is exist
    if(user.profilePhoto.publicId !== null){
        await cloudarniryUploadImage(user.profilePhoto.publicId)
    }

    // 6-change the profile photo filed in db
    user.profilePhoto = {
        url:result.secure_url,
        publicId :result.public_id
    }
    await user.save()
    // 7-send response to the clint
res.status(200).json({
    message:"user profile photo has uploaded",
    profilePhoto:{url:result.secure_url,publicId:result.public_id}
})

// 8-remove image from the service
fs.unlinkSync(imagePath)
});


//  @method ===>delete
//  route ==> /api/users/profile/:id
//  desc ==> delete user profile (account)
//  access ===> (only admin and user himself)

module.exports.deleteUserProfile = asyncHandler(async(req,res)=>{
    // 1-get user form DB
    const user = await User.findById(req.params.id)
    if(!user){
        res.status(404).json({message:"user not found"})
    }
    //  2-get all post from DB
  const posts =   await Post.find({user:user._id})

//  console.log(posts.map(post =>post.image.publicId))
    //  3-get all public ids form DB
    const publicIds = posts?.map(post =>  post.image.publicId);
    // console.log(publicIds)
    // console.log(posts?.map(publicId =>  Image.publicId))
    //  4-delete all posts images form cloudeiary that belongs to this user 
    

    cloudarniryDeleteMutableImages(publicIds)
    // 5-delete the profile picture from cludrariy
    if(publicIds?.length > 0)
    await cloudarniryDeleteImage(user.profilePhoto.publicId)
    // 6-delete user comments and posts

    await Post.deleteMany({user : user._id});
    await Comment.deleteMany({user : user._id})
    // 7-delete user himself
    await User.findByIdAndDelete(req.params.id)
    // 8-send a response to the client

    res.status(200).json({message:"user has been deleted successfully"})

})


