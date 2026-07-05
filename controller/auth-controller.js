const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken") ;


// register controller 

const registerUser = async(req, res) =>{
    try{
        // extract the user information from the body 
        const {username , email , password , role} = req.body ; 
        // check if the user is already exists or not 
        const checkExistedUser = await User.findOne({$or : [{username}, {email}]});
        if(checkExistedUser){
            return res.status(400).json({
                success : false ,
                message : "user is already exists  either with same username or email , Try with different username or email. ",

            });
        }

        // hash the user password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);

        // create a new user and save in our database 
        const newlyCreatedUser = new User({
            username , 
            email , 
            password : hashedPassword , // because we stored the encrypt form of passwrod in database 
            role : role || "user"
        });

        await newlyCreatedUser.save() ; // or new can use the create method to avoid save() , both are fine 

        if(newlyCreatedUser){
            res.status(201).json({
                success : true,
                message : "User registered successfully",
            });
        }
        else{
            res.status(400).json({
                success: false ,
                message : "Unable to register the user ",
            });
        }
 
    }
    catch(e){
        console.log(e) ;
        res.status(500).json({
            success :  false ,
            message : "Something went wrong ! please try again",
        });
    }
};

// login controller 

const loginUser = async(req, res) =>{
    try{
        const {username , password} = req.body ;

        // find if the current user is present in database or not 
        const user = await User.findOne({username});
        
        if(!user){
            return res.status(400).json({
                success: false,
                message : "User doesn't exist",
            });
        }
        // if the password is correct or not 
        const isPasswrodMatch = await bcrypt.compare(password , user.password) ;

        if(!isPasswrodMatch){
            return res.status(400).json({
                success : false ,
                message : "wrong passwrod ! try again with correct password" ,
            });
        }

        // create  user token 
        const accessToken = jwt.sign({
                userId : user._id ,
                username : user.username ,
                role : user.role 
            }, process.env.JWT_SECRET_KEY,{
                expiresIn : "15m"
        });

        res.status(200).json({
            success : true ,
            message : "Logged in  successfully",
            accessToken
        });
        
    }
    catch(e){
        console.log(e) ;
        res.status(500).json({
            success :  false ,
            message : "Something went wrong ! please try again",
        });
    }
};

// password change controller

const changePassword = async(req , res)=>{
    try {
        const userId = req.userInfo.userId ;

        // extract old and new password 
        const {oldPassword , newPassword} = req.body ;

        // find the current logged in user 
        const user = await User.findById(userId) ;

        if(!user){
            return res.status(400).json({
                success : false , 
                message : "User not found" 
            });
        }

        // check if old pass is match 
        const isPasswrodMatch = await bcrypt.compare(oldPassword , user.password) ;

        if(!isPasswrodMatch){
            return res.status(400).json({
                success : false ,
                message :"Old password is not correct! Please try again." ,
            });
        }

        // hash the new  password 
        const salt = await bcrypt.genSalt(10) ;
        const newHashedPassword = await bcrypt.hash(newPassword , salt) ;

        // update new password 
        user.password = newHashedPassword ; 
        await user.save() ;

        res.status(200).json({
            success : true , 
            message : "Password changed successfully"
        });


    }
    catch(err){
        console.log(err) ;
        res.status(500).json({
            success : false ,
            message : "Some error occured! Please try again" ,
        });
    }
}

module.exports = {registerUser , loginUser , changePassword} ;
