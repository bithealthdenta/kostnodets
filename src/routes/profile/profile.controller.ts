import { existUserWithId, getUserWithId} from "../../models/user/user.model";
import jwt from "jsonwebtoken";

export async function getProfile(req,res){
    const token=req.header('Authorization');
    if(!token) res.status(401).json({message:'No token, unauthorize'})
    try{
        const decoded= jwt.verify(token.split(' ')[1], process.env.ACCESS_TOKEN_SECRET);
        
        const existUser= await existUserWithId(decoded.user.id);
        if(!existUser){
          return res.status(400).json({
            error:"User Not Found"
          });
        }
      
        const user = await getUserWithId(decoded.user.id);
        return res.status(200).json(user);
    }
  
    catch(error){
        res.status(400).json({message:error});
    }
}

export async function getProfileCustomer(req,res){
  const token=req.header('Authorization');
  if(!token) res.status(401).json({message:'No token, unauthorize'})
  try{
    res.status(200).json({message:"PROFILE CUSTOME MASIH PROSES"})
  }
  catch(error){
    res.status(400).json({message:error});
  }

}

