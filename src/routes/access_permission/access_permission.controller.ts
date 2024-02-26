import { getPagination } from "../../services/query";
import json from "express";
import {
  getAllAccess,
  getAccesWithId,
  setNewAccess,
  existAccessWithId,
  deleteAccesWithId,
} from "../../models/access_permission/access_permission.model";

export async function httpGetAllAccess(req,res){
    const {skip, limit}=getPagination(req.query);
    const launches= await getAllAccess(skip,limit);

    return res.status(200).json(launches);
}

export async function httpAddNewAccess(req,res){
    const access=req.body;
    console.log(access);
    if(!access.access_name){
            return res.status(400).json({
                error:"Missing Required Property"
            });
    }
    access.created_date = new Date().toISOString();
    await setNewAccess(access);
    return res.status(200).json(access);
}

export async function httpDeleteAccess(req, res) {
    const accessId = Number(req.params.id);
  
    const existAccess = await existAccessWithId(accessId);
  
    if (!existAccess) {
      return res.status(400).json({
        error: "Access not found",
      });
    }
  
    const aborted = await deleteAccesWithId(accessId);
    if (!aborted) {
      return res.status(400).json({
        error: "Acces Not deleted",
      });
    }
    return res.status(200).json({
      ok: true,
    });
  }

export async function httpGetAccessWithId(req, res) {
    const AccessId = req.params.id;

    const existAccess = await existAccessWithId(AccessId);

    if (!existAccess) {
    return res.status(400).json({
        error: "Access not found",
    });
    }
    const access = await getAccesWithId(AccessId);

    return res.status(200).json(access);
}

export async function httpUpdateAccess(req,res){
  const access = req.body;
  console.log(access);
  if(!access._id){
    return res.status(400).json({
      error:"id must be included"
    });
  }
  access.update_date = new Date().toISOString();
  await setNewAccess(access);
  return res.status(200).json(access);
}
