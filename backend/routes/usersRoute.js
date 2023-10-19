const { getAllUsersCtrl,getUserByIdCtrl,profilePhotoUploadCtrl, updateUserCtrl, deleteUserProfile } = require("../controllers/UsersController");
const photoUpload = require("../middlewares/photoUpload");
const validateUserId = require("../middlewares/validateUserId");
const { verifyToken, verifyTokenAdmin, verifyTokenAndOnlyUser, verifyTokenAndAuthorization } = require("../middlewares/verifyToken");

const router = require("express").Router();

module.exports= router

router.route('/profile').get(verifyTokenAdmin,getAllUsersCtrl)

router.route('/profile/photo-upload')
.post(verifyToken,photoUpload.single('image'),profilePhotoUploadCtrl);


router.route('/profile/:id')
.get(validateUserId,getUserByIdCtrl)
.put(validateUserId,verifyTokenAndOnlyUser,updateUserCtrl)
.delete(validateUserId,verifyTokenAndAuthorization,deleteUserProfile)
