import express from "express"
import { UserRoute } from "../routes/user/user.route";
import { AuthRoute } from "../routes/auth/auth.route";
import { RoleRoute } from "../routes/role/role.route";
import { AccessRoute } from "../routes/access_permission/access_permission.route";
import { KostRoute } from "../routes/kost/kost.route";
import { RoomRoute } from "../routes/room/room.route";

import { auth } from "../middleware/auth.middleware";
const api = express.Router();

api.use('/auth',AuthRoute);
api.use('/user',auth,UserRoute);
api.use('/role',auth,RoleRoute);
api.use('/access',auth,AccessRoute);
api.use('/kost',auth,KostRoute);
api.use('/room',auth,RoomRoute);




export const Api=api;