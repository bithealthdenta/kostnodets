import mongoose from "mongoose";

const roomServiceSchema= new mongoose.Schema({
    tittle:{
        type:String,
        required:true,
    },
    request_date:{
        type:Date,
        required:true,
    },
    description:{
        type:String,
    },
    status:{
        type:Boolean,
        required:true,
    },
    update_date:{
        type:Date,
    }
    });

    export const RoomServiceDatabase =mongoose.model("Roomservice",roomServiceSchema);