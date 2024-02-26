import { KostDatabase } from "./kost.mongoo";
import json from "express/lib/response";
import { getRoomWithKostId } from "../room/room.model";
import mongoose from "mongoose";

const DEFAULT_KOSTID=1;



const kost ={
  _id:new Object('64c9310bf6db5212645775d7'),
  kost_name:"Perwita Sari",
  address:"jalan magelang no 32 Yogyakarta",
  description:"Kost ini memiliki fasilitas AC full listrik dll",
  contact:"08788851273",
  status:"available",
  ratings:4,
  features:"Tersedia Parkir, CCTV dan Laundry",
  photos:"NANTI ISI URL PHOTO2"
}
saveKost(kost);
///////////////////////////////////////// function /////

async function CekRoomAvailAndStat(kostid){
  const room= await getRoomWithKostId(kostid);
  if(Object.keys(room).length<0){

  }
  else{
    const status={
      room_availability:0,
      status:"null"
    };
    return status;
  }
}

async function saveKost(kost){
  await KostDatabase.findOneAndUpdate(
    {
      _id:kost._id,
    },
    kost,
    {
      upsert:true,
    }
  );
}

export async function getAllKost(skip,limit){
  const totalData= await KostDatabase.find(
    {},
    {
      __v: 0,
    }
  );
  const data= await KostDatabase.find(
    {},
    {
      __v: 0,
    }
  ).skip(skip).limit(limit);
  return {
    totalData,
    data
  }
}

export async function getAllKostWithSearch(input,skip,limit){
  if(input.search!=undefined && input.status==undefined){
    //query.kost_name={$regex: new RegExp(query.search,'i')};
    const totaldata=await KostDatabase.find({
      kost_name: new RegExp(input.search,'i'),
    },
      {
        __v: 0,
      }
    )
    const data= await KostDatabase.find({
      kost_name: new RegExp(input.search,'i'),
    },
      {
        __v: 0,
      }
    ).skip(skip).limit(limit);

    return{
      totaldata,
      data
    }
  }
  if(input.status!=undefined && input.search==undefined){
    //query.availability_status={$regex: new RegExp(query.status,'i')};
    const totaldata=await KostDatabase.find({
      status: new RegExp(input.status,'i'),
    },
      {
        __v: 0,
      }
    )
    const data= await KostDatabase.find({
      status: new RegExp(input.status,'i'),
    },
      {
        __v: 0,
      }
    ).skip(skip).limit(limit);

    return{
      totaldata,
      data
    };

  }
  else{
    console.log(input);
    const totaldata=await KostDatabase.find({
      $and:[
        {
          kost_name: new RegExp(input.search,'i')
        },{
          status: new RegExp(input.status,'i')
        }
      ]
    },
      {
        __v: 0,
      }
    )
    const data= await KostDatabase.find({
      kost_name: new RegExp(input.search,'i'),
      status: new RegExp(input.status,'i')
    },
      {
        __v: 0,
      }
    ).skip(skip).limit(limit);

    return{
      totaldata,
      data
    };
  }
}
async function getLatestKost(){
  const latestKost=await KostDatabase.findOne().sort("-kostid");
  if(!latestKost){
    return DEFAULT_KOSTID;
  }
  return latestKost._id;
};

export async function setNewKost(kost,idkost){
  if(idkost!=null){
    const newKost = Object.assign(kost, {
    });
    newKost.room_availability=0;
    newKost.ratings=5;
    await saveKost(newKost);
}
else{
    const newKost= await Object.assign(kost,{
        _id:new mongoose.Types.ObjectId()
        });
        await saveKost(newKost);
}
};

export async function existKostWithId(kostId){
  return await KostDatabase.find({
    _id:kostId,
  });
}

export async function deleteKostWithId(kostId){
  const abort = await KostDatabase.deleteOne({
    _id:kostId,
  });
  return abort.deletedCount==1;
}

export async function getKostWithId(kostId){
  const kost = await KostDatabase.find({
    _id:kostId,
  });
  return kost;
}

export async function roomavaillogic(room){
  let roomAvail=0;
  room.forEach(element => {
    if(element.status=="open"){
      roomAvail+=1;
    }
  });
  return roomAvail;
}