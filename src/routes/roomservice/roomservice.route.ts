import express from "express";
import {
  httpGetAllRoomService,
  httpAddNewRoomService,
  httpDeleteRoomService,
  httpGetRoomServiceWithdId,
  httpUpdateRoomService,
} from "./roomservice.controller";


const roomServiceRoute= express.Router();

roomServiceRoute.get("/:id", httpGetRoomServiceWithdId);
roomServiceRoute.get("/", httpGetAllRoomService);
roomServiceRoute.post("/", httpAddNewRoomService);
roomServiceRoute.put("/",httpUpdateRoomService);
roomServiceRoute.delete("/:id", httpDeleteRoomService);

export const RoomServiceRoute = roomServiceRoute;