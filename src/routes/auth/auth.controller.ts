import {existUserWithId, getUserWithId} from "../../models/user/user.model"
import { userDatabase } from "../../models/user/user.mongoo";
import { loginValidation } from "./auth.validation";
import bcrypt from'bcrypt';
import jwt from 'jsonwebtoken';

export async function login(req,res){
  console.log(req.body);
  const {error} = loginValidation(req.body.value);
  if(error) return res.status(400).json({
    message:error
  });

  const userDb= await userDatabase.findOne({username:req.body.username});
  if(!userDb) return res.status(400).json({
    message:'User Not Found'
  })

  //perlu dibuat dengan bcrypt
  // const validpass= await bcrypt.compare(req.body.Password, userDb.password);
  // if(!validpass) return res.status(400).json({
  //   message:'invalid password'
  // });

  if(req.body.password !== userDb.password) return res.status(400).json({
    message:'Invalid Password'
  })

  try{
    const token= jwt.sign(
      {user:{id:userDb._id}},
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn:100000}
    );
    res.status(200).json({token: token})
  }
  catch(error){
    res.status(400).send(error);
  }
}