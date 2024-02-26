import express from "express";
import {
  httpAddNewBooking,
  httpDeleteBooking,
  httpGetAllBooking,
  httpGetBookingWithId,
  httpUpdateBooking,
} from "./booking.controller";

const bookingRoute=express.Router();

bookingRoute.get("/:id", httpGetBookingWithId);
bookingRoute.get("/", httpGetAllBooking);
bookingRoute.post("/", httpAddNewBooking);
bookingRoute.put("/", httpUpdateBooking);
bookingRoute.delete("/:id", httpDeleteBooking);

export const BookingRoute = bookingRoute;
