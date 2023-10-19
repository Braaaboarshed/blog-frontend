const asyncHandler = require("express-async-handler");
const {Comment,validateCreateComment,validateUpdateComment} = require("../models/Comment")

const {User} = require("../models/User");
const { response } = require("express");
   /*------------------------------------------------
* @desc  create new comment
* @method Post
* @route /api/comments
* @process private (only logged in users)
--------------------------------------------------*/
module.exports.createNewCommentCtrl = asyncHandler(async(req,res)=>{
     const {error} = validateCreateComment(req.body)
     if(error){
        return res.status(400).json({message:error.details[0].message})
     }

     const profile = await User.findById(req.user._id);
     const comment = await Comment.create({
        postId:req.body.postId,
        text: req.body.text,
        user:req.user._id,
        username:profile.username
    });
     res.status(201).json(comment) 

});

/*=================================================
* @desc  get all comments
* @method get
* @route /api/comments
* @process private (only admin )
--------------------------------------------------*/
module.exports.getAllCommentsCtrl = asyncHandler(async (req, res) => {
   const comments = await Comment.find().populate("user",["-password"]);
   res.status(200).json(comments);
 });





 /*=================================================
* @desc  delete comment
* @method DELETE
* @route /api/comments/:id
* @process private (only admin or user himself )
--------------------------------------------------*/
module.exports.DeleteCommentsCtrl = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id)
  if(!comment){
   return res.status(404).json({message:"comment not found"});
  }
  if(req.user.isAdmin || (req.user._id === comment.user.toString())){
   await Comment.findByIdAndDelete(req.params.id)
     res.status(200).json({message:'comment deleted successfully'})
  }

  else{
   res.status(403).json({message:'denied'})

  }
 });


   /*------------------------------------------------
* @desc  update comment
* @method PUT
* @route /api/comments/:id
* @process private (only comment owner)
--------------------------------------------------*/
module.exports.updateCommentCtrl = asyncHandler(async(req,res)=>{
   const comment = await Comment.findById(req.params.id)
   console.log(comment)
   if(!comment){
      return res.status(400).json({message:"comment not found"})
   }
   if( req.user._id != comment.user.toString()){
   return res.status(403).json({message:" Access denied"})
   }

const updatedComment = await Comment.findByIdAndUpdate(req.params.id,{
   $set:{
      text :req.body.text
   }
},{new:true})
   res.status(201).json(updatedComment) 

});
