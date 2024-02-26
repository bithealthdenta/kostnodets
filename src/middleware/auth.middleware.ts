import jwt from "jsonwebtoken";

export const auth=(req,res,next)=>{
    const token = req.header('Authorization');
    if(!token) res.status(401).json({message:'No token, unauthorize'})
    try{
        const decoded= jwt.verify(token.split(' ')[1], process.env.ACCESS_TOKEN_SECRET);
        req.user =decoded;
        next();
    }
    catch(error){
        res.status(400).json({message:error});
    }
}