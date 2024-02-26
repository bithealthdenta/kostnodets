import { RoomServiceDatabase } from "./roomservice.mongoo";
import mongoose from "mongoose";

const roomService = {
    _id:Object("64c94d2e6518620708ae4ab4"),
    tittle: "Memebersihkan Kamar",
    request_date: new Date().toISOString(),
    description: "Tolong bersihkan kamar tidak usah di pel",
    status:false,
    update_date:new Date().toISOString()
};

saveRoomService(roomService);

async function saveRoomService(roomService) {
    console.log(roomService);
    await RoomServiceDatabase.findOneAndUpdate(
    {
        _id:roomService._id
    },
    roomService,
    {
        upsert: true,
    }
    );
}

export async function getAllRoomService(skip,limit) {
    return await RoomServiceDatabase.find(
    {},
    {
        __v: 0,
    }
    ).skip(skip).limit(limit);
}

export async function setNewRoomService(roomService) {
    if(roomService._id!=undefined){
    console.log("ke update");
    const setNewRoomService=Object.assign(roomService,{});
        await saveRoomService(setNewRoomService);
}
else{
    const setNewRoomService=Object.assign(roomService,{
    _id:new mongoose.Types.ObjectId()
    });
    await saveRoomService(setNewRoomService);
}
}

export async function existRoomServiceWithId(roomServiceId) {
    return await RoomServiceDatabase.find({
    _id: roomServiceId,
    });
}

export async function deleteRoomServiceWithId(roomServiceId) {
    const abort = await RoomServiceDatabase.deleteOne({
    _id: roomServiceId,
    });
    return abort.deletedCount === 1;
}

export async function getRoomServiceWithId(roomServiceId) {
    const roomService = await RoomServiceDatabase.find({
    _id: roomServiceId,
    });

    return roomService;
}