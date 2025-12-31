const jwt=require('jsonwebtoken')

const authMiddleware=(req,res,next)=>{
    const token=req.header.authorization
    if(!token){
        res.status(401).json({
            "success": false,
            "error": "Unauthorized, token missing or invalid"
          })
          return
    }
    try{
        const {userId,role}=jwt.verify(token,process.env.jwt_password)
        req.userId=userId,
        req.role=role
        next()
    }
    catch(e){
        res.status(401).json({
            "success": false,
            "error": "Unauthorized, token missing or invalid"
          })
    }
}