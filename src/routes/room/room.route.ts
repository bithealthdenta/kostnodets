import express from "express";
import {
  httpGetAllRoom,
  httpAddNewRoom,
  httpDeleteRoom,
  httpGetRoomWithdId,
  httpUpdateRoom,
} from "./room.controller";

const roomRoute = express.Router();

roomRoute.get("/:id", httpGetRoomWithdId);
roomRoute.get("/", httpGetAllRoom);
roomRoute.post("/", httpAddNewRoom);
roomRoute.put("/:id", httpUpdateRoom);
roomRoute.delete("/:id", httpDeleteRoom)

export const RoomRoute=roomRoute;
