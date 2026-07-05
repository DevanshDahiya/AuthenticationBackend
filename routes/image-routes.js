const express = require("express") ;
const router = express.Router() ;

const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");
const uploadMiddleware = require("../middleware/upload-middleware") ; 
const { uploadImageController, fetchImageController } = require("../controller/image-controller");

// upload the image 
router.post("/upload" , authMiddleware ,adminMiddleware , uploadMiddleware.single("image") , uploadImageController) ;
router.get("/get" ,authMiddleware ,  fetchImageController) ;


module.exports = router ; 
