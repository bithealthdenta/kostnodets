import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    kost:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Kost",
    },
    room_type: {
      type: String,
      required: true,
    },
    room_number: {
      type: String,
      required: true,
    },
    room_floor: {
      type: String,
      required: true,
    },
    room_size: {
      type: String,
      required: true,
    },
    price:{
      type:Number,
      required:true
    },
    description: {
      type: String,
      required: true,
    },
    status:{
      type:String,
      required:true
    },
    maintenance_date:{
      type:Date,
      required:true
    },
    facilities:{
      type:String,
      required:true
    },
    created_date: {
      type: Date,
    },
    update_date: {
      type: Date,
    },
  });

  export const RoomDatabase=mongoose.model("Room", roomSchema);