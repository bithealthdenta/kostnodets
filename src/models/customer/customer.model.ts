
import { CustomerDatabase } from "./customer.mongoose";
import mongoose from "mongoose";
import { createPaymentReg } from "../payment/payment.model";

const DEFAUL_CUSTOMER_ID = 100;

const customer = {
  _id:Object("64ccec860062cf4a85b9916c"),
  nik: "441130101124124",
  username: "CustomerDummy",
  password: "password2!",
  first_name: "Customer",
  last_name: "Dummy",
  phone: "087838961011",
  address: "Solo Baru Jawa Tengah",
  profession:"Mahasiswa",
  institute:"UKSW",
  email:"denta.marceelus@gmail.com",
  entry_date: new Date("December 11, 2022").toISOString(),
  room_service_stat:"Selesai",
  birth_date: new Date("December 11, 1996").toISOString(),
  created_date: new Date("August 4, 2023").toISOString(),
  update_date: new Date().toISOString(),
  birth_place:"Jakarta",
  status:"Aktif"
};

saveCustomer(customer);
/////////////////////////////////////////////////////////
export async function setNewCustomer(customer,idcust) {
  if(idcust!=null){
    customer.update_date= new Date().toISOString();
    const newCustomer=Object.assign(customer,{});
      await saveCustomer(newCustomer);
      if(customer.room!=undefined)
        await createPaymentReg(newCustomer._id, customer.room);
}
else{
  customer.created_date= new Date().toISOString();
  const newCustomer=Object.assign(customer,{
    _id:new mongoose.Types.ObjectId()
    });
    await saveCustomer(newCustomer);
    if(customer.room!=undefined)
      await createPaymentReg(newCustomer._id, customer.room);
  }
}

export async function getAllCustWithSearch(input,skip,limit){
  if(input.search!=undefined && input.status==undefined){
    console.log("DISEARCH");
    const condition={
      $or: [
        { first_name: new RegExp(input.search,'i') },
        { last_name: new RegExp(input.search,'i') },
        { email: new RegExp(input.search,'i') },
        { phone: new RegExp(input.search,'i') },
      ]
    };
    const totaldata= await CustomerDatabase.find(condition,{__v:0});
    const data= await CustomerDatabase.find(condition,{__v:0}).skip(skip).limit(limit);
    return {totaldata,data};
  }
  if(input.status!=undefined && input.search==undefined){
    console.log("DISTATUS")
    const condition ={
      status: new RegExp(input.status,'i') 
    };
    const totaldata= await CustomerDatabase.find(condition,{__v:0});
    const data= await CustomerDatabase.find(condition,{__v:0}).skip(skip).limit(limit);
    return {totaldata,data};
  }
  else{
    console.log("DISEARCH dan DISTATUS");
    const condition= {
      $or: [
        { first_name: new RegExp(input.search,'i') },
        { last_name: new RegExp(input.search,'i') },
        { email: new RegExp(input.search,'i') },
        { phone: new RegExp(input.search,'i') },
      ],
      $and: [
        { status: new RegExp(input.status,'i') },
      ],
    };
    const totaldata= await CustomerDatabase.find(condition,{__v:0});
    const data= await CustomerDatabase.find(condition,{__v:0}).skip(skip).limit(limit);
    return {totaldata,data};
  }
}

export async function getAllCustomer(skip, limit) {
  const totaldata= await CustomerDatabase.find(
    {},
    {
      
      __v: 0,
    }
  );
  const data= await CustomerDatabase.find(
    {},
    {
      
      __v: 0,
    }
  ).skip(skip).limit(limit);
  return{totaldata,data};
}

async function saveCustomer(customer) {
  await CustomerDatabase.findOneAndUpdate(
    {
      _id: customer._id,
    },
    customer,
    {
      upsert: true,
    }
  );
}

export async function existCustomerWithId(customerId) {
  return await CustomerDatabase.find({
    _id: customerId,
  });
}

export async function deleteCustomerWithId(customerId) {
  const abort = await CustomerDatabase.deleteOne({
    _id: customerId,
  });
  return abort.deletedCount === 1;
}

export async function getCustomerWithId(customerId) {
  const customer = await CustomerDatabase.find({
    _id: customerId,
  });

  return customer;
}
