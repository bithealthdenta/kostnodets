import express from "express";

import {
  httpAddNewParents,
  httpDeleteParents,
  httpGetAllParents,
  httpGetParentsWithId,
  httpUpdateParents,
} from "./parents.controller";

const parentsRoute=express.Router();

parentsRoute.get("/:id", httpGetParentsWithId);
parentsRoute.get("/", httpGetAllParents);
parentsRoute.post("/", httpAddNewParents);
parentsRoute.put("/", httpUpdateParents);
parentsRoute.delete("/:id", httpDeleteParents);

export const ParentsRoute = parentsRoute;
