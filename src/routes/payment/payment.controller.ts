import {
    getAllPayment,
    setNewPayment,
    existPaymentWithId,
    deletePaymentWithId,
    getPaymentWithId,
  } from "../../models/payment/payment.model";
  import { getPagination } from "../../services/query";
  
  export async function httpGetAllPayment(req, res) {
      console.log(req.query);
      const {skip, limit}=getPagination(req.query);
      const launches = await getAllPayment(skip, limit)
      return res.status(200).json(launches);
  }
  
  export async function httpAddNewPayment(req, res) {
      const payment = req.body;
      if (
        !payment.file_url ||
        !payment.file_name ||
        !payment.payment_period ||
        !payment.payment_date
      ) {
        return res.status(400).json({
          error: "Missing Required Property",
        });
      }
      await setNewPayment(payment);
      return res.status(201).json(payment);
    }
  
  export async function httpDeletePayment(req, res) {
      const paymentId = req.params.id;
      const existPayment = await existPaymentWithId(paymentId);
  
      if (!existPayment) {
      return res.status(400).json({
          error: "Payment not found",
      });
      }
      const aborted = await deletePaymentWithId(paymentId);
      if (!aborted) {
      return res.status(400).json({
          error: "Payment Not deleted",
      });
      }
      return res.status(200).json({
      ok: true,
      });
  }
  
  export async function httpGetPaymentWithId(req, res) {
      const paymentId = req.params.id;
    
      const existPayment = await existPaymentWithId(paymentId);
    
      if (!existPayment) {
        return res.status(400).json({
          error: "payment not found",
        });
      }
      const payment = await getPaymentWithId(paymentId);
    
      return res.status(200).json(payment);
    }
  
  export async function httpUpdatePayment(req,res){
      const payment = req.body;
      console.log(payment);
      if(!payment._id){
        return res.status(400).json({
          error:"id must be included"
        });
      }
      await setNewPayment(payment);
      return res.status(200).json(payment);
    }