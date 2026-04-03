const mongoose = require("mongoose");
// defining the schema of the database
const UserSchema = new mongoose.Schema({
    username : {
        type : String ,
        required : true ,
        unique : true ,
        trim : true ,
    },
    email : {
        type : String ,
        required : true ,
        unique : true , 
        trim : true ,
        lowercase : true ,
    },
    password : {
        type : String ,
        required : true ,
    },
    role :{
        type : String ,
        enum : ["user" , "admin"] , // only allow user and admin roles 
        default : "user",
    }

}, {timestamps : true });

module.exports = mongoose.model("User" , UserSchema);
