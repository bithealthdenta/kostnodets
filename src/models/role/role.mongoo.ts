import mongoose from "mongoose"

const roleSchema= new mongoose.Schema({
    role_name:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true
    },
    created_date:{
        type:Date,
    },
    update_date:{
        type:Date,
    },
    access:[{
        // type: mongoose.Schema.Types.ObjectId,
        // ref:"access"
        access_name:{
            type:String,
            required:true
        },
        read:{
            type:Boolean,
            required:true
        },write:{
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
        }
    }]
});

export const roleDatabase=mongoose.model("Role",roleSchema);