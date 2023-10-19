const mongoose = require('mongoose');
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const jwt = require("jsonwebtoken")

const UserSchema =new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
    },
    profilePhoto: {
        type: Object,
        default: {
            url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
            publicId: null,
        }
    },
    bio :{
        type:String
    },
    isAdmin: {
        type:Boolean,
        default: false,
    },
    isAccountVerified: {
        type:Boolean,
        default: false,
    },
}, {
    timestamps: true,
    toJSON :{virtuals:true},
    toObject :{virtuals :true}
  
})

// populate posts that belongs to this user when he get his profile
UserSchema.virtual("posts",{
    ref : "Post",
    foreignField : "user",
    localField :"_id"
})



UserSchema.methods.generateAuthToken =  function(){
    return jwt.sign({_id:this._id,isAdmin:this.isAdmin},process.env.JWT_SECRET)
}

function validateRegisterUser(obj) {
    const schema = Joi.object({
        username: Joi.string().trim().min(2).max(100).required(),
        email: Joi.string().trim().min(5).max(100).required().email(),
        password: passwordComplexity().required(),
    });
    return schema.validate(obj);
}

function validateLoginUser(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
        password: passwordComplexity().required(),
    });
    return schema.validate(obj);
}
function validateUpdateUser(obj){
    const schema =  Joi.object({
        username :Joi.string().trim().min(3).max(100),
        password: passwordComplexity(),
        bio: Joi.string()
    })
    return schema.validate(obj);

}


const User = mongoose.model("User",UserSchema)

module.exports ={
    User,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUser
}