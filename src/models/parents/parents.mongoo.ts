import mongoose from "mongoose";
const parentsSchema=new mongoose.Schema({
    customer_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Customer"
    },
parents_name: {
    type: String,
    required: true,
},
parents_relation: {
    type: String,
    required: true,
},
parents_phone: {
    type: String,
    required: true,
},
parents_address: {
    type: String,
    required: true,
    },
parents_email:{
    type:String,
    required:true
},
parents_profession:{
    type:String,
    required:true
},
emergency_contact:{
    type:String,
    required:true
},
created_date:{
    type:Date
}
});

export const ParentsDatabase=mongoose.model("Parent",parentsSchema);