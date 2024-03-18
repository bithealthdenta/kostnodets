import { BookingDatabase } from "./booking.mongoo";

import mongoose from "mongoose";

const booking={
    approve_by:Object("64c94d2d6518620708ae4ab2"),
    customer_id:Object("64ccec860062cf4a85b9916c"),
    room_id:Object("64d7557d0a3312b8be9e7c14"),
    check_in_date:new Date().toISOString(),
    check_out_date:new Date("December 11, 2030").toISOString(),
    status:"Book",
    amount:"1500000",
    payment_status:"Processing",
    notes:"akan segera masuk minggu depan",
    created_date:new Date().toISOString(),
    update_date:new Date().toISOString()
};

saveBooking(booking);

async function saveBooking(booking){
    await BookingDatabase.findOneAndUpdate(
        {
        _id: booking._id,
        },
        booking,
        {
        upsert: true,
        }
    ).populate("approve_by").populate("customer_id").populate("room_id");
}
export function summ(sum1, sum2){
    return sum1+sum2;
}
export async function getAllBooking(skip, limit) {
    return await BookingDatabase.find(
    {},
    {
        
        __v: 0,
    }
    ).populate("approve_by").populate("customer_id").populate("room_id").skip(skip).limit(limit);
}

export async function existBookingWithId(bookingId) {
    return await BookingDatabase.find({
    _id: bookingId,
    }).populate("approve_by").populate("customer_id").populate("room_id");
}

export async function deleteBookingWithId(bookingId) {
    const abort = await BookingDatabase.deleteOne({
    _id: bookingId,
    });
    return abort.deletedCount === 1;
}

export async function getBookingWithId(bookingId) {
    const booking = await BookingDatabase.find({
    _id: bookingId,
    }).populate("approve_by").populate("customer_id").populate("room_id");
    return booking;
}

export async function setNewBooking(booking) {
    if(booking._id!=undefined){
        const newBooking = Object.assign(booking, {
        });
        
        await saveBooking(newBooking);
    }
    else{
        const newBooking=Object.assign(booking,{
            _id:new mongoose.Types.ObjectId()
            });
            await saveBooking(newBooking);
    }
    
}
