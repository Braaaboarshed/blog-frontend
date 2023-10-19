const { createCategoryCtrl, getAllCategoriesCtrl, deleteCategoryCtrl } = require("../controllers/categoriesController");
const {verifyToken,verifyTokenAdmin} =require("../middlewares/verifyToken");
const validateID= require("../middlewares/validateUserId")
const router  = require("express").Router()



router.route("/")
  .post(verifyToken,verifyTokenAdmin,createCategoryCtrl)
  .get(getAllCategoriesCtrl)


router.route("/:id")
   .delete(validateID,verifyTokenAdmin,deleteCategoryCtrl);


module.exports =router;