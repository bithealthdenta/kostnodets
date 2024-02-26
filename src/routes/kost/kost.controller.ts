import {
  getAllKost,
  setNewKost,
  existKostWithId,
  deleteKostWithId,
  getKostWithId,
  getAllKostWithSearch,
  roomavaillogic,
} from "../../models/kost/kost.model";
import { getRoomWithKostId } from "../../models/room/room.model";

import { getPagination } from "../../services/query";
export async function httpGetAllKost(req,res){
    const{skip,limit,page}=getPagination(req.query);

    if(req.query.search !=undefined || req.query.status!=undefined){
      const {totaldata,data}= await getAllKostWithSearch(req.query,skip,limit);
      return res.status(200).json({
        data:data,
        total_items:Object.keys(totaldata).length,
        current_page:page,
        per_page:limit
      });
      
    }
    else{
      const {totalData,data} = await getAllKost(skip,limit);
      return res.status(200).json(
        {
          data:data,
          total_items:Object.keys(totalData).length,
          current_page:page,
          per_page:limit
        });
    }
  }

 export async function httpAddNewKost(req,res){
    const kost = req.body;
    if(!kost.kost_name|| !kost.address || !kost.contact){
      return res.status(400).json({
        error:"Required field must filled"
      });
    }
    await setNewKost(kost,null);
    return res.status(200).json(kost);
  }

 export async function httpUpdateKost(req,res){
    const idkost = req.params.id;
    const kost=req.body;
    console.log(kost);
    console.log(idkost);
    if(!idkost){
      return res.status(400).json({
        error:"id must be included"
      });
    }
    await setNewKost(kost,idkost);
    return res.status(200).json(kost);
  }

 export async function httpDeleteKost(req,res){
    const kostId= req.params.id;
  
    const existKost= await existKostWithId(kostId);
    if(!existKost){
      return res.status().json({
        error:"Kost Doesn't exist"
      });
    }
    const aborted = await deleteKostWithId(kostId);
    if(!aborted){
      return res.status(200).json({
        error:"Kost Not Deleted",
      });
    }
    return res.status(200).json({
      ok:true,
    });
  }

 export async function httpGetKostWithId(req,res){
    const kostId= req.params.id;
  
    const existKost=await existKostWithId(kostId);
    if(!existKost){
      return res.status(400).json({
        error:"Kost Not Found"
      });
    }
  
    const kost = await getKostWithId(kostId);
    return res.status(200).json(kost);
  }

 export async function httpGetRoomWithKostID(req,res){
    const kostId=req.params.id;
    const room= await getRoomWithKostId(kostId);
    if(Object.keys(room).length>0){
      console.log(room)
      var roomavail=await roomavaillogic(room);
      return res.status(200).json({lengthroom:roomavail})
    }
    else{
      return res.status(400).json(
        {
          error:"Kost has no room"
        }
      );
    }
  }

