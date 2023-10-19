const { createPostCtrl, getAllPosts, getSinglePost, getPostCount,deletePostCtrl    , updatePostCtrl, toggleLikeCtrl } = require('../controllers/postsController');
const photoUpload = require('../middlewares/photoUpload');
const validateUserId = require('../middlewares/validateUserId');
const { verifyToken } = require('../middlewares/verifyToken');
const {updatePostImageCtrl} = require("../controllers/postsController")
const router = require('express').Router();

router.route("/")
   .post(verifyToken,photoUpload.single("image"),createPostCtrl)
   .get(getAllPosts)

   router.route("/count")
   .get(getPostCount)

   router.route("/:id")
   .get(validateUserId,getSinglePost)
   .delete(verifyToken,deletePostCtrl)
   .put(verifyToken,updatePostCtrl);


router.route("/update-image/:id")
.put(validateUserId,verifyToken,photoUpload.single("image") ,updatePostImageCtrl)


 // /api/post/like/:id
 router.route("/like/:id").put(verifyToken,validateUserId,toggleLikeCtrl)
module.exports = router 