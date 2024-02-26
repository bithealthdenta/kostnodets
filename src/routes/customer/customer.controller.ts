import { getPagination } from "../../services/query";
import {
  getAllCustomer,
  setNewCustomer,
  existCustomerWithId,
  deleteCustomerWithId,
  getCustomerWithId,
  getAllCustWithSearch,
} from "../../models/customer/customer.model";

import { existRoomWithId, updateStatusRoom} from "../../models/room/room.model"

export async function httpGetAllCustomer(req, res) {
    const {skip, limit,page}=getPagination(req.query);
    if(req.query.search!=undefined || req.query.status!=undefined){
      const{totaldata,data}= await getAllCustWithSearch(req.query, skip,limit);
      return res.status(200).json({
        data:data,
        total_items:Object.keys(totaldata).length,
        current_page:page,
        per_page:limit
      });
    }
    else{
      const {totaldata,data}=await getAllCustomer(skip,limit);
      return res.status(200).json({
        data:data,
        total_items:Object.keys(totaldata).length,
        current_page:page,
        per_page:limit
      });
    }
  }
  
  export async function httpAddNewCustomer(req, res) {
    const customer = req.body;
    if (
      !customer.nik||
      !customer.username||
      !customer.password||
      !customer.first_name||
      !customer.last_name||
      !customer.phone||
      !customer.address||
      !customer.profession||
      !customer.institute||
      !customer.email||
      !customer.birth_date||
      !customer.birth_place
    ) {
      return res.status(400).json({
        error: "Missing Required Property",
      });
    }
    customer.created_date = new Date().toISOString();
    await setNewCustomer(customer,null);
    return res.status(201).json(customer);
  }
  
 export async function httpDeleteCustomer(req, res) {
    const customerId = req.params.id;
  
    const existCustomer = await existCustomerWithId(customerId);
  
    if (!existCustomer) {
      return res.status(400).json({
        error: "Customer not found",
      });
    }
  
    const aborted = await deleteCustomerWithId(customerId);
    if (!aborted) {
      return res.status(400).json({
        error: "Customer Not deleted",
      });
    }
    return res.status(200).json({
      ok: true,
    });
  }
  
export async function httpGetCustomerWithId(req, res) {
    const customerId = req.params.id;
  
    const existCustomer = await existCustomerWithId(customerId);
  
    if (!existCustomer) {
      return res.status(400).json({
        error: "Customer not found",
      });
    }
    const customer = await getCustomerWithId(customerId);
  
    return res.status(200).json(customer);
  }
  
  export async function httpUpdateCustomer(req,res){
    const idcust = req.params.id;
    const customer = req.body;
    console.log(customer);
    if(!idcust){
      return res.status(400).json({
        error:"id must be included"
      });
    }
    await setNewCustomer(customer,idcust);
    return res.status(200).json(customer);
  }
  