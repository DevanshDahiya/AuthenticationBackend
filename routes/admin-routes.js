// This is for admin access -> 

const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const router = express.Router() ;
const adminMiddleware = require("../middleware/admin-middleware");

//  here we are using  authMiddleware , adminMiddleware as a extra layer to first check if the a person is login or not 
// second is for chenking if it is a admin or not 
router.get("/welcome" , authMiddleware , adminMiddleware , (req, res) =>{
    res.json({
        message : "Welcome to admin page"
    });
});

module.exports = router ;