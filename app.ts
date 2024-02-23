import path from "path";
import express from "express"
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet"
////////////// SWAGGER ///////////////////
import swaggerUi from "swagger-ui-express"
import swaggerDocument from "./swagger/swagger.json"

import {Api} from './apiversioning/api';

const app=express();

app.use(
    cors({
      origin: "http://localhost:4200"
      //origin:"https://kost-puce.vercel.app"
    })
  );

app.use(morgan("combined"));

app.use(express.json());



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//api route versioning
app.use('/v1',Api);

export const App=app;