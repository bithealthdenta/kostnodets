import express from "express"
import { UserRoute } from "../routes/user/user.route";
import { AuthRoute } from "../routes/auth/auth.route";
import { RoleRoute } from "../routes/role/role.route";
import { AccessRoute } from "../routes/access_permission/access_permission.route";
import { KostRoute } from "../routes/kost/kost.route";
import { RoomRoute } from "../routes/room/room.route";
import { BookingRoute } from "../routes/booking/booking.route";
import { CustomerRoute } from "../routes/customer/customer.route";
import { PaymentRoute } from "../routes/payment/payment.route";
import { ProfileRoute } from "../routes/profile/profile.route";
import { RoomServiceRoute } from "../routes/roomservice/roomservice.route";
import { ParentsRoute } from "../routes/parents/parents.route";

import { auth } from "../middleware/auth.middleware";
const api = express.Router();

api.use('/auth',AuthRoute);
api.use('/user',auth,UserRoute);
api.use('/role',auth,RoleRoute);
api.use('/access',auth,AccessRoute);
api.use('/kost',auth,KostRoute);
api.use('/room',auth,RoomRoute);
api.use('/booking',auth,BookingRoute);
api.use('/customer',auth,CustomerRoute);
api.use('/payment',auth,PaymentRoute);
api.use('/roomservice',auth,RoomServiceRoute);
api.use('/parents',auth,ParentsRoute);

//////////////// for private route
api.use('/profile',ProfileRoute);
//////////////// without auth
api.use('/reguser',UserRoute);
api.use('/regcustomer',CustomerRoute);


export const Api=api;