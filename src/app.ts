import path from "path";
import express from "express"
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet"
import dotenv from 'dotenv'; 

////////////// SWAGGER ///////////////////
import swaggerUi from "swagger-ui-express"
import swaggerDocument from "./swagger/swagger.json"

import {Api} from './apiversioning/api';

const app=express();
dotenv.config();

app.use(
    cors({
      origin: "http://localhost:5173"
      //origin:"https://kost-puce.vercel.app"
    })
  );

app.use(morgan("combined"));

app.use(express.json());



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//api route versioning
app.use('/v1',Api);

export const App=app;