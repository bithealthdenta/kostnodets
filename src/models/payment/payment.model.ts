import { PaymentDatabase } from "./payment.mongoo";
import moment from "moment";
import mongoose from "mongoose";
import {getRoomWithId, updateStatusRoom } from "../room/room.model"
import { SerializeMongo } from "../../utilities/commonfunction";

const payment={
    _id:Object('64c94d2e6518620708ae4ab2'),
    payment_period:2,
    status:"Lunas",
    due_date:new Date("September 4, 2023").toISOString(),
    last_payment: new Date("August 4, 2023").toISOString(),
    update_date: new Date().toISOString(),
    payment_date:new Date("August 3, 2023").toISOString(),
    amount:1500000,
    description:"Ini untuk pembayaran bulan agustus sampai september",
    date_cleared:new Date("August 5, 2023").toISOString(),
    payment_notes:"Ini notes",
    receipt_number:"INV/230804/A1",
    payment_recipient:new Object('64ca60a6b5d7e6fddec8f724'),
    customer:new Object('64ccec860062cf4a85b9916c')

}


savePayment(payment);

export async function createPaymentReg(custId, roomId){
  var room = await getRoomWithId(roomId);
  const obj=await SerializeMongo(room);

  var invoice = "INV/"+moment().format("yyMMD")+"/"+obj[0].room_number;
  const payment={
    payment_period:1,
    status:"Processing",
    due_date:new Date().toISOString(),
    last_payment: null,
    update_date: new Date().toISOString(),
    payment_date:null,
    amount:obj[0].price,
    description:"Pembayaran Registrasi",
    date_cleared:null,
    payment_notes:"",
    customer:custId,
    receipt_number:invoice,
    payment_recipient:null
  }

  setNewPayment(payment)
  updateStatusRoom(roomId,"Booked");
}


async function savePayment(payment) {
    await PaymentDatabase.findOneAndUpdate(
      {
        _id: payment._id,
      },
      payment,
      {
        upsert: true,
      }
    ).populate("customer_id").populate("payment_recipient");
  }

  export async function setNewPayment(payment) {
    if(payment._id!=undefined){
      console.log("ke update");
      payment.update_date= new Date().toISOString();
      const newPayment=Object.assign(payment,{});
        await savePayment(newPayment);  
  }
  else{
    const newPayment=Object.assign(payment,{
      _id:new mongoose.Types.ObjectId()
      });
      await savePayment(newPayment);
  }
  }

 export async function getAllPayment(skip, limit) {
    return await PaymentDatabase.find(
      {},
      {
        
        __v: 0,
      }
    ).populate("customer_id").populate("payment_recipient").skip(skip).limit(limit);
  }

 export async function existPaymentWithId(paymentId) {
    return await PaymentDatabase.find({
      _id: paymentId,
    }).populate("customer_id").populate("payment_recipient");
  }
  
  export async function deletePaymentWithId(paymentId) {
    const abort = await PaymentDatabase.deleteOne({
      _id: paymentId,
    });
    return abort.deletedCount === 1;
  }
  
  export async function getPaymentWithId(paymentId) {
    const payment = await PaymentDatabase.find({
      _id: paymentId,
    }).populate("customer_id").populate("payment_recipient");
  
    return payment;
  }
