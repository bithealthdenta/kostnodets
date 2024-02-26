import express from "express";
import {httpGetAllKost,
    httpAddNewKost,
    httpDeleteKost,
    httpGetKostWithId,
    httpGetRoomWithKostID,
  httpUpdateKost} from "./kost.controller"

const kostRoute=express.Router();

kostRoute.get("/:id",httpGetKostWithId);
kostRoute.get("/getroom/:id",httpGetRoomWithKostID)
kostRoute.get("/", httpGetAllKost);
kostRoute.post("/", httpAddNewKost);
kostRoute.put("/:id", httpUpdateKost);
kostRoute.delete("/:id", httpDeleteKost);

export const KostRoute=kostRoute;