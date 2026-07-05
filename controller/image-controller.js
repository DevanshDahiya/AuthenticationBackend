const Image = require("../models/Image") ;
const { uploadToCloudinary }  = require("../helpers/cloudinaryHelper") ;


const uploadImage = async(req, res)=>{
    try{
        // check if file is missing in req object 
        if(!req.file){
            return res.status(400).json({
                success : false ,
                message : "File is required. Please upload an image."
            }) ;
        }
        // upload to cloudinary 
        const {url , publicId} = await uploadToCloudinary(req.file.path) ;
        // now store the image url and public id along with the uploaded user id 

        const newlyUploadedImage = new Image({
            url ,
            publicId ,
            uploadedBy : req.userInfo.userId 
        });
        await newlyUploadedImage.save() ;

        res.status(201).json({
            stauts : true , 
            message :"Image uploaded." ,
            image : newlyUploadedImage
        });
    }
    catch(err){
        console.log(err) ;
        res.status(500).json({
            success : false ,
            message : "Something went wrong!" 
        });
    }
};

module.exports = {
    uploadImage 
};