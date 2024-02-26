import express from "express";
import {httpGetAllUser,
    httpAddNewUser,
    httpDeleteUser,
    httpGetUserWithId,
  httpUpdateUser} from "./user.controller"

const userRoute=express.Router();

userRoute.get("/:id",httpGetUserWithId);
userRoute.get("/", httpGetAllUser);
userRoute.post("/", httpAddNewUser);
userRoute.put("/",httpUpdateUser);
userRoute.delete("/:id", httpDeleteUser);

export const UserRoute = userRoute;