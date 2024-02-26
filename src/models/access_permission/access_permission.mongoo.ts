import mongoose from "mongoose"
const accessSchema= new mongoose.Schema({
    access_name:{
        type:String,
        required:true,
    },
    read:{
        type:Boolean,
        required:true
    },
    write:{
        type:Boolean,
        required:true
    },
    update:{
        type:Boolean,
        required:true
    },
    delete:{
        type:Boolean,
        required:true
    },
    created_date:{
        type:Date
    },
    update_date:{
        type:Date
    }
});

export const AccessDatabase=mongoose.model("access",accessSchema);