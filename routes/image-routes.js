const express = require("express") ;
const router = express.Router() ;

const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");
const uploadMiddleware = require("../middleware/upload-middleware") ; 
const { uploadImageController, fetchImageController , deleteImageController } = require("../controller/image-controller");

// upload the image 
router.post("/upload" , authMiddleware ,adminMiddleware , uploadMiddleware.single("image") , uploadImageController) ;
router.get("/get" ,authMiddleware ,  fetchImageController) ;

// delete image route 
// 6a4a8296e8ac68ad5345b964
router.delete("/:id" , authMiddleware , adminMiddleware ,deleteImageController) ;

module.exports = router ; 
