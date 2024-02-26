import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    nik: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
    institute: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    entry_date: {
      type: Date,
    },
    room_service_stat: {
      type: String,
    },
    birth_date: {
      type: Date,
      required:true
    },
    created_date: {
      type: Date,
    },
    update_date: {
      type: Date,
    },
    birth_place:{
      type:String,
      required:true
    },
    gender:{
      type:String,
      required:true
    },
    status:{
      type:String,
      required:true
    }
  });

  export const CustomerDatabase = mongoose.model("Customer", customerSchema);