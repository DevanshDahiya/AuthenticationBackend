
// it will identify the role of the person ->
const isAdminuser = (req, res, next) =>{
    if(req.userInfo.role !== "admin"){
        return res.status(404).json({
            success : false ,
            message : "Access Denied! Admin right required",
        });
    }
    next ();
}

module.exports = isAdminuser ;