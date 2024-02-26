import json from "express";
import { getPagination } from "../../services/query";
import {
  getAllBooking,
  setNewBooking,
  existBookingWithId,
  deleteBookingWithId,
  getBookingWithId,
} from "../../models/booking/booking.model";

export async function httpGetAllBooking(req, res) {
    const {skip, limit}=getPagination(req.query);
    const launches = await getAllBooking(skip, limit)
    return res.status(200).json(launches);
}

export async function httpAddNewBooking(req,res){
    const booking=req.body;
    if(!booking.customer_id ||
        !booking.room_id ||
        !booking.check_in_date ||
        !booking.amount
        ){
        return res.status(400).json({
            error:"Missing Required property",
        });
    }
    booking.created_date= new Date().toISOString();
    await setNewBooking(booking);
    return res.status(201).json(booking);
}

export async function httpDeleteBooking(req, res) {
    const bookingId = req.params.id;
    const existBooking = await existBookingWithId(bookingId);
    if (!existBooking) {
    return res.status(400).json({
        error: "Booking not found",
    });
    }

    const aborted = await deleteBookingWithId(bookingId);
    if (!aborted) {
    return res.status(400).json({
        error: "Booking Not deleted",
    });
    }
    return res.status(200).json({
        ok: true,
    });
}

export async function httpGetBookingWithId(req, res) {
    const bookingId = req.params.id;

    const existBooking = await existBookingWithId(bookingId);
    if (!existBooking) {
    return res.status(400).json({
        error: "Booking not found",
    });
    }
    const booking = await getBookingWithId(bookingId);
    return res.status(200).json(booking);
}

export async function httpUpdateBooking(req,res){
    const booking = req.body;
    console.log(booking);
    if(!booking._id){
    return res.status(400).json({
        error:"id must be included"
    });
    }
    await setNewBooking(booking);
    return res.status(200).json(booking);
}