const router = require('express').Router();
const { createNewCommentCtrl, getAllCommentsCtrl, DeleteCommentsCtrl, updateCommentCtrl } = require('../controllers/commentsController');
const {verifyToken, verifyTokenAdmin} = require('../middlewares/verifyToken');
const validateUserId = require('../middlewares/validateUserId');
const { validateCreateComment } = require("../models/Comment");
module.exports = router


router.route('/')
.get( verifyTokenAdmin,getAllCommentsCtrl)
.post(verifyToken,createNewCommentCtrl);


router.route('/:id')
.put(verifyToken,validateUserId,updateCommentCtrl)
.delete(verifyToken,validateUserId,DeleteCommentsCtrl)
