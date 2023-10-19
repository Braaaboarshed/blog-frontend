const fs = require("fs");
const path = require("path");
const asyncHandler = require("express-async-handler");
const {Post,validateCreatePost,validateUpdatePost} = require("../models/Post");
const {cloudarniryUploadImage, cloudarniryDeleteImage} = require("../utils/cloudirany")
const {Comment} = require("../models/Comment")
/*------------------------------------------------
* @desc Create new post
* @method POST
* @route /api/posts
* @process private (only logged in users)
--------------------------------------------------*/

module.exports.createPostCtrl = asyncHandler(async(req,res) => {
 // 1-validation for image 
 if(!req.file){
   return res.status(400).json({message:"no image provided"})
 }
 // 2- validation for data
 const {error} = validateCreatePost(req.body)
 if(error){
    return res.status(400).json({message:error.details[0].message })
 }
 // 3-upload photo
 const imagePath = path.join(__dirname,`../images/${req.file.filename}`)
 const result = await cloudarniryUploadImage(imagePath)
 // 4-Create new post and save it in db
 console.log(req.body)
  const post = await Post.create({
    title:req.body.title,
    description :req.body.description,
    category : req.body.category,
    user:req.user._id,
    image:{
        url:result.secure_url,
        publicId :result.public_id,
    },

  })
 // 5-send response to the client
 res.status(201).json(post)
 // 6-Remove the image from the server
 fs.unlinkSync(imagePath)
});

/*------------------------------------------------
* @desc get all posts
* @method GET
* @route /api/posts
* @process public
--------------------------------------------------*/
module.exports.getAllPosts = asyncHandler(async(req,res)=>{
    const POST_PER_PAGE = 3; 
    const {pageNumber,category} =req.query;
    let posts;
    if(pageNumber){
        posts = await Post.find()
            .skip((pageNumber - 1) *POST_PER_PAGE)
            .limit(POST_PER_PAGE)
            .sort({createdAt:-1})
            .populate("user",["-password"]);    }
    else if(category){
        posts =await Post.find({category : category})
        .sort({createdAt:-1})
        .populate("user",["-password"])

    }
    else{
        posts = await Post.find()
        .sort({createdAt:-1})
        .populate("user",["-password"])
    }
    res.status(200).json(posts)
})


/*------------------------------------------------
* @desc get single posts
* @method GET
* @route /api/post/:id
* @process public
--------------------------------------------------*/
module.exports.getSinglePost = asyncHandler(async(req,res)=>{

    const post = await Post.findById(req.params.id)
    .populate("user",["-password"])
    .populate("comments");


    if(!post){
        res.status(404).json({message:"user not found"})
    }
    res.status(200).json(post)
})


/*------------------------------------------------
* @desc get  post count
* @method GET
* @route /api/post/count
* @process public
--------------------------------------------------*/
module.exports.getPostCount = asyncHandler(async(req,res)=>{

  const count = await Post.count();
  res.status(200).json(count)
})


/*------------------------------------------------
* @desc delete post
* @method DELETE 
* @route /api/post/:id
* @process private (only admin and post owner)
--------------------------------------------------*/
module.exports.deletePostCtrl = asyncHandler(async(req,res)=>{
    
    const post = await Post.findByIdAndDelete(req.params.id)

    if(!post){
        res.status(404).json({message:"user not found"})
    }
    console.log(req.user._id , post.user._id.toString())

    if(req.user.idAdmin || req.user._id === post.user._id.toString()){
    await await Post.findByIdAndDelete(req.params.id)
    await cloudarniryDeleteImage(post.image.publicId)
// delete all the comments that belongs to this post
       
 await Comment.deleteMany({postId :post._id}) 

    res.status(200).json({message : 'post has been deleted successfully'})
    }

    else{
        res.status(403).json({message:"access denied"})
    }

});

/*------------------------------------------------
* @desc Update Post
* @method PUT
* @route /api/posts
* @process private (only post owner)
--------------------------------------------------*/

module.exports.updatePostCtrl = asyncHandler(async(req,res) => {
  
    // 1- validation for data
    const {error} = validateUpdatePost(req.body)
    if(error){
       return res.status(400).json({message:error.details[0].message })
    }
 // 2-get the post and check if it is exist
    const post = await Post.findById(req.params.id)
    if(!post){
       return res.status(404).json({message:"post dose not exist"})
    }
    // 3-check if the post belongs to this user 
    if(req.user._id !== post.user.toString()){
       return res.status(403).json({message :"access denied"})
    }
    // 4-update post
    const updatePost = await Post.findByIdAndUpdate(req.params.id,{
        $set:{
            title :req.body.title,
            description: req.body.description,
            category:req.body.category

        }
    },{new:true}).populate("user",["-password"])

    // 5-send a response to the client
    res.status(200).json(updatePost)

   });
   

   
/*------------------------------------------------
* @desc Update image Post 
* @method PUT
* @route /api/posts/upload-image/:id 
* @process private (only post owner)
--------------------------------------------------*/

module.exports.updatePostImageCtrl = asyncHandler(async(req,res) => {
  
    // 1- validation for data
    console.log(req.body)
    if(!req.file){

       return res.status(400).json({message:"no image provided" })
    }
 // 2-get the post and check if it is exist
    const post = await Post.findById(req.params.id)
    console.log(req.params.id)
    if(!post){
       return res.status(404).json({message:"post dose not exist"})
    }
    // 3-check if the post belongs to this user 
    if(req.user._id !== post.user.toString()){
       return res.status(403).json({message :"access denied"})
    }
    // 4-update image post

    //delete old image
    await cloudarniryDeleteImage(post.image.publicId)
     //upload new image
     const imagePath = path.join(__dirname,`../images/${req.file.filename}`)
     const result = await cloudarniryUploadImage(imagePath);
     //update image filed in DB
     const updateImage = await Post.findByIdAndUpdate(req.params.id,{
        $set:{
         image:{
            url:result.secure_url,
            publicId :result.public_id  
         }

        }
    },{new:true})

    // 5-send a response to the client
    res.status(200).json(updateImage)   
   
    //remove image from server
    fs.unlinkSync(imagePath)

   });
   

   /*------------------------------------------------
* @desc Toggle like 
* @method PUT
* @route /api/posts/like/id
* @process private (only logged in users)
--------------------------------------------------*/

module.exports.toggleLikeCtrl = asyncHandler(async(req,res)=>{
    const loggedInUser = req.user._id;
    const {id :postId} = req.params
    let post = await Post.findById(postId); 
    if(!post ){
        return res.status(404).json({message:'post not found'})
    }
    const isPostAlreadyLiked =post.likes.find((user)=>user.toString() === loggedInUser)
    if(isPostAlreadyLiked){
         post = await  Post.findByIdAndUpdate(postId,{
            $pull :{likes :loggedInUser}
            
         })
    //  if(likes.length === 1) likes = ['']
         
    }
    else{
        post = await  Post.findByIdAndUpdate(postId,{
            $push :{likes :loggedInUser}
         })
         
    }
    res.status(200).json(post)
})