import {
  getAllRoomService,
  setNewRoomService,
  existRoomServiceWithId,
  deleteRoomServiceWithId,
  getRoomServiceWithId,
} from "../../models/roomservice/roomservice.model";

import { getPagination } from "../../services/query";

export async function httpGetAllRoomService(req, res) {
    console.log(req.query);
    const {skip, limit}=getPagination(req.query);
    const roomService = await getAllRoomService(skip,limit);
    return res.status(200).json(roomService);
}

export async function httpAddNewRoomService(req, res) {
    const roomService = req.body;
    console.log(roomService);
    if (!roomService.tittle || !roomService.request_date || !roomService.status) {
    return res.status(400).json({
        error: "Required Field must filled",
    });
    }
    await setNewRoomService(roomService);
    return res.status(200).json(roomService);
}


export async function httpDeleteRoomService(req, res) {
    const roomServiceId = req.params.id;
    const existRoomService = await existRoomServiceWithId(roomServiceId);
    if (!existRoomService) {
    return res.status().json({
        error: "Room Service Doesn't exist",
    });
    }
    const aborted = await deleteRoomServiceWithId(roomServiceId);
    if (!aborted) {
    return res.status(400).json({
        error: "Room Service Not deleted",
    });
    }
    return res.status(200).json({
    ok: true,
    });
}

export async function httpGetRoomServiceWithdId(req, res) {
    const roomServiceId = req.params.id;
    const existRoomService = await existRoomServiceWithId(roomServiceId);
    if (!existRoomService) {
    return res.status(400).json({
        error: "Room Service Not Found",
    });
    }
    const roomService = await getRoomServiceWithId(roomServiceId);
    return res.status(200).json(roomService);
}
export async function httpUpdateRoomService(req,res){
    const roomService = req.body;
    console.log(roomService);
    if(!roomService._id){
      return res.status(400).json({
        error:"id must be included"
      });
    }
    await setNewRoomService(roomService);
    return res.status(200).json(roomService);
  }
