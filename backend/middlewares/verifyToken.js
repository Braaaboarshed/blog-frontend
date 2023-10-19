const jwt = require("jsonwebtoken")
const { User } = require("../models/User")


function verifyToken(req,res,next){
    const authToken = req.headers.authorization
    if(authToken){
        const token = authToken.split(" ")[1]
        try{

            const decodedPayLoad = jwt.verify(token,process.env.JWT_SECRET)
            req.user = decodedPayLoad
            next()
        }
        catch(error){
            res.status(401).json({message :"invalid token"})
        }
    }
    else{
        res.status(401).json({message :"no token provided, access denied"})
    }
}


function verifyTokenAdmin(req,res,next){
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            // res.status(200).json(users)
            next()
        }
        else{
            res.status(403).json({message:"you are denied"})
        }
    })
}

function verifyTokenAndOnlyUser(req,res,next){
    verifyToken(req,res,()=>{

       
        if(req.user._id == req.params.id){
            
            next()
        }
        else{
         return   res.status(403).json({message:"only user himself can update the data "})
        }
    })
}

function verifyTokenAndAuthorization(req,res,next){
    verifyToken(req,res,()=>{
        console.log(req.user._id,req.params.id)
        if(req.user._id === req.params.id || req.user.isAdmin ){
            next()
        }
        else{
         return   res.status(403).json({message:"only user himself can update the data or admin "})
        }
    })
}




module.exports ={
    verifyToken,
    verifyTokenAdmin,
    verifyTokenAndOnlyUser,
    verifyTokenAndAuthorization
}