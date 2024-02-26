import { ParentsDatabase } from "./parents.mongoo";
import mongoose from "mongoose";
const parents={
    customer_id:new Object('64ccec860062cf4a85b9916c'),
    parents_name:"Joko",
    parents_relation:"Ayahanda",
    parents_phone:"087838961012",
    parents_address:"Jalan kakap no 71d sukoharjo",
    parents_email:"joko_lodro@gmail.com",
    parents_profession:"Nelayan Paus",
    emergency_contact:"087838991010"
};

saveParents(parents);

async function saveParents(parents){
    await ParentsDatabase.findOneAndUpdate(
        {
        _id: parents._id,
        },
        parents,
        {
        upsert: true,
        }
    ).populate("customer_id");
}

export async function getAllParents(skip, limit) {
    return await ParentsDatabase.find(
    {},
    {
        
        __v: 0,
    }
    ).populate("customer_id").skip(skip).limit(limit);
}

export async function existParentsWithId(parentsId) {
    return await ParentsDatabase.find({
    _id: parentsId,
    }).populate("customer_id");
}

export async function deleteParentsWithId(parentsId) {
    const abort = await ParentsDatabase.deleteOne({
    _id: parentsId,
    });
    return abort.deletedCount === 1;
}

export async function getParentsWithId(parentsId) {
    const parents = await ParentsDatabase.find({
    _id: parentsId,
    }).populate("customer_id");
    return parents;
}

export async function setNewParents(parents) {
    if(parents._id!=undefined){
        const newParents = Object.assign(parents, {
        });
        
        await saveParents(newParents);
    }
    else{
        const newParents=Object.assign(parents,{
            _id:new mongoose.Types.ObjectId()
            });
            await saveParents(newParents);
    }
}