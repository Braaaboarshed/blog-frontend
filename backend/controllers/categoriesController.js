const asyncHandler = require("express-async-handler");
const {Category,validateCreateCategory} = require("../models/category")
   /*------------------------------------------------
* @desc  create new Category
* @method Post
* @route /api/categories
* @process private (only admin)
--------------------------------------------------*/

module.exports.createCategoryCtrl = asyncHandler(async(req,res)=>{
    const {error} = validateCreateCategory(req.body);
    if(error){
        return res.status(400).json({message:error.details[0].message})
    }
    const category = await Category.create({
        title:req.body.title,
        user:req.user._id
    })
    res.status(201).json(category)
});

   /*------------------------------------------------
* @desc  get All Categories
* @method get
* @route /api/categories
* @process public
--------------------------------------------------*/

module.exports.getAllCategoriesCtrl = asyncHandler(async(req,res)=>{

    const category = await Category.find()
    res.status(201).json(category)
});

   /*------------------------------------------------
* @desc  delete categories
* @method Delete
* @route /api/categories/:id
* @process private (only admin )
--------------------------------------------------*/

module.exports.deleteCategoryCtrl = asyncHandler(async(req,res)=>{
    const category = await Category.findById(req.params.id)
    if(!category){
        res.status(404).json({message:"category not found "})
    }
    await Category.findByIdAndDelete(req.params.id);

        res.status(201).json({message:"category deleted successfully",categoryId :req.params.id})
})