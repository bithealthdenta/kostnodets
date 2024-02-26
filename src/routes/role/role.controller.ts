import {
  getAllRole,
  setNewRole,
  existRoleWithId,
  deleteRoleWithId,
  getRoleWithId,
} from "../../models/role/role.model";

import { getPagination } from "../../services/query";

export async function httpGetAllRole(req, res) {
    console.log("SAMPAI SNI");
    const {skip, limit}=getPagination(req.query);
    const role = await getAllRole(skip,limit);
    return res.status(200).json(role);
}

export async function httpAddNewRole(req, res) {
    const role = req.body;
    console.log(role);
    if (!role.role_name) {
    return res.status(400).json({
        error: "Required Field must filled",
    });
    }
    role.createdDate = new Date().toISOString();
    console.log(role.createdDate);
    await setNewRole(role);
    return res.status(200).json(role);
}

export async function httpUpdateRole(req, res) {
    const role = req.body;
    if(!role._id){
        return res.status(400).json({
            error: "Id not found",
        });
    }
    await setNewRole(role);
    return res.status(200).json(role);
}


export async function httpDeleteRole(req, res) {
    const roleId = req.params.id;

    const existRole = await existRoleWithId(roleId);

    if (!existRole) {
    return res.status().json({
        error: "Role Doesn't exist",
    });
    }

    const aborted = await deleteRoleWithId(roleId);
    if (!aborted) {
    return res.status(400).json({
        error: "Role Not deleted",
    });
    }
    return res.status(200).json({
    ok: true,
    });
}

export async function httpGetRoleWithdId(req, res) {
    const roleId = req.params.id;
    const existRole = await existRoleWithId(roleId);
    if (!existRole) {
    return res.status(400).json({
        error: "Role Not Found",
    });
    }

    const role = await getRoleWithId(roleId);

    return res.status(200).json(role);
}
