import mongoose from "mongoose";
import { AccessDatabase } from "./access_permission.mongoo";
const access_permission={
    _id:new Object('64c94d2e6518620708ae4ab2'),
    access_name:"Main Access",
    read:true,
    write:true,
    update:true,
    delete:true,
    created_date:new Date().toISOString(),
    update_date:new Date().toISOString(),
}
saveAccess(access_permission);

async function saveAccess(access){
    await AccessDatabase.findOneAndUpdate(
        {
          _id: access._id,
        },
        access,
        {
          upsert: true,
        }
      )
}

export async function setNewAccess(access){
    if(access._id!=undefined){
        const newAccess=Object.assign(access,{});
        await saveAccess(newAccess);
    }
    else{
        const newAccess=Object.assign(access,{
            _id:new mongoose.Types.ObjectId()
        });
        await saveAccess(newAccess);
    }
}

export async function getAllAccess(skip,limit){
    return await AccessDatabase.find(
        {},
        {
            __v:0,
        }
    ).skip(skip).limit(limit);
}

export async function existAccessWithId(id){
    return await AccessDatabase.find({
        _id:id
    });
}

export async function deleteAccesWithId(id){
    const abort=await AccessDatabase.deleteOne({
        _id:id
    });

    return abort.deletedCount ===1;
}

export async function getAccesWithId(id){
    const access= await AccessDatabase.find({
        _id:id
    });

    return access;
}
