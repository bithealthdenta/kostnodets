import express from "express";
import {getProfile, getProfileCustomer} from "./profile.controller"

const profileRoute=express.Router();

profileRoute.get("/getuser",getProfile);
profileRoute.get("/getcustomer",getProfileCustomer);

export const ProfileRoute = profileRoute;
