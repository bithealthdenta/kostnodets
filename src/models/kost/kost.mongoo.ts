import mongoose from "mongoose";

const kostSchema= new mongoose.Schema({
    kost_name:{
      type:String,  
      required:true
    },
    address:{
      type:String,
      required:true
    },
    description:{
      type:String
    },
    contact:{
      type:String,
      required:true
    },
    status:{
      type:String,
      required:true
    },
    room_availability:{
      type:Number,
      required:true
    },
    ratings:{
      type:Number,
      required:true
    },
    features:{
      type:String
    },
    photos:{
      type:String
    }
  });

  export const KostDatabase =mongoose.model("Kost",kostSchema);