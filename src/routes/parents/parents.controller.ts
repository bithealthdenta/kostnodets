import {
  getAllParents,
  setNewParents,
  existParentsWithId,
  deleteParentsWithId,
  getParentsWithId,
} from "../../models/parents/parents.model";

import { getPagination } from "../../services/query";

export async function httpGetAllParents(req,res){
    const {skip, limit}=getPagination(req.query);
    const launches = await getAllParents(skip, limit)
    return res.status(200).json(launches);
}

export async function httpAddNewParents(req,res){
    const parents=req.body;
    if(!parents.customer_id ||
        !parents.parents_name ||
        !parents.parents_relation ||
        !parents.parents_phone ||
        !parents.parents_address ||
        !parents.parents_profession ||
        !parents.emergency_contact
        ){
        return res.status(400).json({
            error:"Missing Required property",
        });
    }
    parents.created_date= new Date().toISOString();
    await setNewParents(parents);
    return res.status(201).json(parents);
}

export async function httpDeleteParents(req, res) {
    const parentsId = req.params.id;
    const existParents = await existParentsWithId(parentsId);
    if (!existParents) {
    return res.status(400).json({
        error: "Booking not found",
    });
    }

    const aborted = await deleteParentsWithId(parentsId);
    if (!aborted) {
    return res.status(400).json({
        error: "Booking Not deleted",
    });
    }
    return res.status(200).json({
        ok: true,
    });
}

export async function httpGetParentsWithId(req, res) {
    const parentsId = req.params.id;

    const exist = await existParentsWithId(parentsId);
    if (!exist) {
    return res.status(400).json({
        error: "Booking not found",
    });
    }
    const parents = await getParentsWithId(parentsId);
    return res.status(200).json(parents);
}

export async function httpUpdateParents(req,res){
    const parents = req.body;
    console.log(parents);
    if(!parents._id){
    return res.status(400).json({
        error:"id must be included"
    });
    }
    await setNewParents(parents);
    return res.status(200).json(parents);
}


