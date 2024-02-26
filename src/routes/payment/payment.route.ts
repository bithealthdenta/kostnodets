import express from "express";
import {
  httpAddNewPayment,
  httpDeletePayment,
  httpGetAllPayment,
  httpGetPaymentWithId,
  httpUpdatePayment,
} from "./payment.controller";

const paymentRoute = express.Router();

paymentRoute.get("/:id", httpGetPaymentWithId);
paymentRoute.get("/", httpGetAllPayment);
paymentRoute.post("/", httpAddNewPayment);
paymentRoute.put("/", httpUpdatePayment);
paymentRoute.delete("/:id", httpDeletePayment);

export const PaymentRoute= paymentRoute;
