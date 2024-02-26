import express from "express";
import {
  httpAddNewCustomer,
  httpDeleteCustomer,
  httpGetAllCustomer,
  httpGetCustomerWithId,
  httpUpdateCustomer,
} from "./customer.controller";

const customerRoute = express.Router();

customerRoute.get("/:id", httpGetCustomerWithId);
customerRoute.get("/", httpGetAllCustomer);
customerRoute.post("/", httpAddNewCustomer);
customerRoute.put("/:id", httpUpdateCustomer);
customerRoute.delete("/:id", httpDeleteCustomer);

export const CustomerRoute = customerRoute;