import query from "express";
import {
  getAllUser,
  setNewUser,
  existUserWithId,
  deleteUserWithId,
  getUserWithId,
  getUserWithFilter,
} from "../../models/user/user.model";

import { getPagination } from "../../services/query";

export async function httpGetAllUser(req,res){
    console.log(req.query);
    const{skip,limit}=getPagination(req.query);
    if(req.query.param!=undefined){
      const user= await getUserWithFilter(req.query.param);
      
      if(!user){
        return res.status().json({
          error:"User Doesn't exist"
        });
      }
      else{
        return res.status(200).json(user);
      }
      //return res.status(200).json(user);
    }else{
      console.log("ke sini");
      const user = await getAllUser(skip,limit);
      return res.status(200).json(user);
    }
    
  }
  
  export async function httpAddNewUser(req,res){
    const user = req.body;
    console.log(user);
    if(!user.username|| !user.password || !user.email || !user.role){
      return res.status(400).json({
        error:"Required field must filled"
      });
    }
    await setNewUser(user);
    return res.status(200).json(user);
  }
  
 export async function httpUpdateUser(req,res){
    const user = req.body;
    console.log(user);
    if(!user._id){
      return res.status(400).json({
        error:"id must be included"
      });
    }
    await setNewUser(user);
    return res.status(200).json(user);
  }
  
  export async function httpDeleteUser(req,res){
    const userId= req.params.id;
  
    const existUser= await existUserWithId(userId);
    if(!existUser){
      return res.status().json({
        error:"User Doesn't exist"
      });
    }
  
    const aborted = await deleteUserWithId(userId);
    if(!aborted){
      return res.status(400).json({
        error:"User Not Deleted",
      });
    }
    return res.status(200).json({
      ok:true,
    });
  }
  
  export async function httpGetUserWithId(req,res){
    const userId= req.params.id;
    const existUser=await existUserWithId(userId);
    if(!existUser){
      return res.status(400).json({
        error:"User Not Found"
      });
    }
  
    const user = await getUserWithId(userId);
    return res.status(200).json(user);
  }