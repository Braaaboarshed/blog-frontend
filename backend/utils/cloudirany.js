const cloudinary = require("cloudinary")

cloudinary.config({
    cloud_name : process.env.ClOUDINARY_CLOD_NAME,
    api_key :process.env.ClOUDINARY_API_KEY,
    api_secret :process.env.ClOUDINARY_API_SECRET
});

const cloudarniryUploadImage = async(fileUpload)=>{
    try{
        const data = await cloudinary.uploader.upload(fileUpload,{
            resource_type : 'auto',
        })
        return data
    }

    catch(error){

        return error
    }
}

const cloudarniryDeleteImage = async(imagePublicId)=>{
    try{
        const result = await cloudinary.uploader.destroy(imagePublicId)
        return result
    }
    catch(error){
        return error
    }
}

// remove many images from cloudarny

const cloudarniryDeleteMutableImages = async(publicIds)=>{
    try{
        const result = await cloudinary.v2.api.delete_resources(publicIds)
        return result
    }
    catch(error){
        return error
    }
}


module.exports = {
    cloudarniryDeleteImage,
    cloudarniryUploadImage,
    cloudarniryDeleteMutableImages 
}