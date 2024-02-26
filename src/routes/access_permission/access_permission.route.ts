import express from "express";
import {
  httpAddNewAccess,
  httpDeleteAccess,
  httpGetAccessWithId,
  httpGetAllAccess,
  httpUpdateAccess,
} from "./access_permission.controller";

const accessRoute=express.Router();

accessRoute.get("/:id", httpGetAccessWithId);
accessRoute.get("/", httpGetAllAccess);
accessRoute.post("/", httpAddNewAccess);
accessRoute.put("/", httpUpdateAccess);
accessRoute.delete("/:id", httpDeleteAccess);

export const AccessRoute = accessRoute;
