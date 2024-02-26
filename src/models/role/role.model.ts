import mongoose from "mongoose"
import { roleDatabase } from "./role.mongoo"
const DEFAULT_ROLEID=1;

const role={
    _id:new Object('64c94d2e6518620708ae4ab3'),
    role_name:"SuperAdmin",
    status:"Aktif",
    created_date: new Date("December 11, 2022").toISOString(),
    access:[
        {
            access_name:"user",
            read:true,
            write:true,
            update:true,
            delete:true
        },
        {
            "access_name": "customer",
            "read": true,
            "write": true,
            "update": true,
            "delete": true
        },
        {
            "access_name": "room",
            "read": true,
            "write": true,
            "update": true,
            "delete": true
        },
        {
            "access_name": "kost",
            "read": true,
            "write": true,
            "update": true,
            "delete": true
        }
    ]
}
saveRole(role);
//////////////////////////////////////////////

async function saveRole(role){
    
    await roleDatabase.findOneAndUpdate({
        _id:role._id,
    },
    role,
    {
        upsert:true,
    }
    ).populate("access");
}

export async function getAllRole(skip,limit){
    return await roleDatabase.find({},
        {
            __v:0
        }).populate("access").skip(skip).limit(limit);
}

export async function getLatestRole(){
    const latestRole=await roleDatabase.findOne().sort("-roleid");
    if(!latestRole){
        return DEFAULT_ROLEID;
    }
    return latestRole._id;
}

export async function setNewRole(role) {
    if(role._id!=undefined){
        const newRole = Object.assign(role, {
        });
        
        await saveRole(newRole);
    }
    else{
        const newRole=Object.assign(role,{
            _id:new mongoose.Types.ObjectId()
            });
            await saveRole(newRole);
    }
    
}

export async function existRoleWithId(roleId) {
    return await roleDatabase.find({
    _id: roleId,
    });
}

export async function deleteRoleWithId(roleId) {
    const abort = await roleDatabase.deleteOne({
    _id: roleId,
    });
    return abort.deletedCount === 1;
}

export async function getRoleWithId(roleId) {
    const role = await roleDatabase.find({
        _id: roleId,
    }).populate("access");
    return role;
}