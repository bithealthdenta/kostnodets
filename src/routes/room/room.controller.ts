import { json } from "express";
import {
  getAllRoom,
  setNewRoom,
  existRoomWithId,
  deleteRoomWithId,
  getRoomWithId,
  getAllRoomWithSearch,
} from "../../models/room/room.model";

import { getPagination } from "../../services/query";

export async function httpGetAllRoom(req, res) {
    const {skip, limit,page}=getPagination(req.query);
    if(req.query.search !=undefined || req.query.status !=undefined || req.query.kost!=undefined){
      const{totaldata,data}=await getAllRoomWithSearch(req.query,skip,limit);
      return res.status(200).json({
        data:data,
        total_items:Object.keys(totaldata).length,
        current_page:page,
        per_page:limit
      });
    }
    else{
      const {totaldata,data}=await getAllRoom(skip,limit);
      return res.status(200).json({
        data:data,
        total_items:Object.keys(totaldata).length,
        current_page:page,
        per_page:limit
      });
    }
    
  }
  
  export async function httpAddNewRoom(req, res) {
    const room = req.body;
    if (!room.price || !room.room_type || !room.room_number ||
      !room.room_floor || !room.status) {
      return res.status(400).json({
        error: "Required Field must filled",
      });
    }
    room.created_date = new Date();
    room.update_date= new Date();
    await setNewRoom(room,null);
    return res.status(200).json(room);
  }
  
 export async function httpDeleteRoom(req, res) {
    const roomId = req.params.id;
  
    const existRoom = await existRoomWithId(roomId);
    console.log(existRoom)
    if (!existRoom) {
      return res.status(400).json({
        error: "Room Doesn't exist",
      });
    }
  
    const aborted = await deleteRoomWithId(roomId);
    if (!aborted) {
      return res.status(200).json({
        error: "Room Not deleted",
      });
    }
    return res.status(200).json({
      ok: true,
    });
  }
  
 export async function httpGetRoomWithdId(req, res) {
    const roomId = req.params.id;
  
    const existRoom = await existRoomWithId(roomId);
  
    if (!existRoom) {
      return res.status(400).json({
        error: "Room Not Found",
      });
    }
  
    const room = await getRoomWithId(roomId);
  
    return res.status(200).json(room);
  }
  
 export async function httpUpdateRoom(req,res){
    const idroom= req.params.id;
    const room = req.body;
    console.log(room);
    if(!room._id){
      return res.status(400).json({
        error:"id must be included"
      });
    }
    await setNewRoom(room,idroom);
    return res.status(200).json(room);
  }