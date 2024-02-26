import mongoose from "mongoose";
import { RoomDatabase } from "./room.mongoo";

const DEFAULT_ROOMID = 1;
const room = {
  _id:Object("64ccec860062cf4a85b9916f"),
  kost:Object("64c9310bf6db5212645775d7"),
  room_type: "Besar",
  room_number: "A1",
  room_floor: "1",
  room_size:"20x10",
  price:1200000,
  description:"kamar termasuk tipe kamar mandi dalam dengan AC",
  status:"not available",
  facilities:"AC, Kamar Mandi dalam",
  maintenance_date: new Date("December 11, 2022").toISOString(),
  created_date: new Date("December 11, 2022").toISOString(),
  update_date:new Date("December 11, 2022").toISOString()
};

saveRoom(room);
///////////////////////////////////////////////////////

export async function getAllRoom(skip,limit) {
  const totaldata= await  await RoomDatabase.find(
    {},
    {
      __v: 0,
    }
  ).populate("kost");
  const data= await RoomDatabase.find(
    {},
    {
      __v: 0,
    }
  ).populate("kost").skip(skip).limit(limit);

  return{totaldata,data};
}

export async function getAllRoomWithSearch(input,skip,limit){
  console.log(input);
  if(input.kost!=undefined){
    if(input.status!=undefined){
      const totaldata=await RoomDatabase.find({
        $and: [
          { kost:Object(input.kost) }, 
          {status: new RegExp(input.status,'i')  }
        ]
      },
      {
        __v:0
      });
      const data= await RoomDatabase.find({
        $and: [
          { kost:Object(input.kost) }, 
          {status: new RegExp(input.status,'i')  }
        ]
      },
        {
          __v: 0,
        }
      ).skip(skip).limit(limit);
      return{totaldata,data};  
    }
    else{
      const totaldata=await RoomDatabase.find({
        kost:Object(input.kost) 
      },
      {
        __v:0
      });
      const data= await RoomDatabase.find({
        kost:Object(input.kost) 
      },
        {
          __v: 0,
        }
      ).skip(skip).limit(limit);
      return{totaldata,data};
    }    
    
    
  }
  if(input.search!=undefined && input.status==undefined){
    const totaldata=await RoomDatabase.find({
      room_number:new RegExp(input.search,'i'),
    },
    {
      __v:0,
    });

    const data= await RoomDatabase.find({
      room_number: new RegExp(input.search,'i'),
    },
      {
        __v: 0,
      }
    ).skip(skip).limit(limit);

    return{totaldata,data};
  }
  if(input.status!=undefined && input.search==undefined){
    const totaldata=await RoomDatabase.find({
      status:new RegExp(input.status,'i'),
    },
    {
      __v: 0,
    });

    const data= await RoomDatabase.find({
      status: new RegExp(input.status,'i'),
    },
      {
        __v: 0,
      }
    ).skip(skip).limit(limit);

    return{totaldata,data}
  }
  else{
    const totaldata=await RoomDatabase.find({
      $and:[
        {
          room_number:new RegExp(input.search,'i')
        },{
          status:new RegExp(input.status,'i')
        }
      ]
      
    
    },
    {
      __v:0,
    });

    const data= await RoomDatabase.find({
      room_number: new RegExp(input.search,'i'),
      status:new RegExp(input.status,'i')
    },
      {
        __v: 0,
      }
    ).skip(skip).limit(limit);

    return{totaldata,data}
  }
}

export async function setNewRoom(room,idroom) {
  if(idroom!=null){
    const setNewRoom=Object.assign(room,{});
      await saveRoom(setNewRoom);
}
else{
  const setNewRoom=Object.assign(room,{
    _id:new mongoose.Types.ObjectId()
    });
    await saveRoom(setNewRoom);
}
}

export async function updateStatusRoom(roomId, status){
  await RoomDatabase.findOneAndUpdate(
    {
      _id:roomId
    },
    {
      status:status,
    },
    {
      upsert: true,
    }
  ).populate("kost");
}

export async function existRoomWithId(roomId) {
  return await RoomDatabase.find({
    _id: roomId,
  }).populate("kost");
}

export async function deleteRoomWithId(roomId) {
  const abort = await RoomDatabase.deleteOne({
    _id: roomId,
  });
  
  return abort.deletedCount==1;
}

async function saveRoom(room) {
  await RoomDatabase.findOneAndUpdate(
    {
      _id:room._id
    },
    room,
    {
      upsert: true,
    }
  ).populate("kost");
}

export async function getRoomWithId(roomId) {
  const room = await RoomDatabase.find({
    _id: roomId,
  }).populate("kost");

  return room;
}

export async function getRoomWithKostId(kostId){
  return await RoomDatabase.find({
    kost:kostId,
  }).populate("kost");;
}