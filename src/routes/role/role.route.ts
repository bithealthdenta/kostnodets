import express from "express";
import {
  httpGetAllRole,
  httpAddNewRole,
  httpDeleteRole,
  httpGetRoleWithdId,
  httpUpdateRole,
} from "./role.controller";

const roleRoute=express.Router();

roleRoute.get("/:id", httpGetRoleWithdId);
roleRoute.get("/", httpGetAllRole);
roleRoute.post("/", httpAddNewRole);
roleRoute.put("/", httpUpdateRole);
roleRoute.delete("/:id", httpDeleteRole);

export const RoleRoute= roleRoute;