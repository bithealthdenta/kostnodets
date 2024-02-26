import mongoose from "mongoose";
const bookingSchema=new mongoose.Schema({
    approve_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    customer_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Customer"
    },
    room_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Room"
    },
    check_in_date:{
        type:Date,
        required:true,
    },
    check_out_date:{
        type:Date,
        required:true,
    },
    status:{
        type:String
    },
    amount:{
        type:String
    },
    payment_status:{
        type:String
    },
    notes:{
        type:String
    },
    created_date:{
        type:Date
    },
    update_date:{
        type:Date
    }
}); 

export const BookingDatabase= mongoose.model("Booking",bookingSchema);