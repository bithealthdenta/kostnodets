import express from "express";
import fs from "fs";
import path from "path";
import https from "https";
import http from "http";
import { App } from "./app";
import { connectDb } from "./src/config/db";

const PORT = process.env.PORT || 4000;

//COMMENT DLU UNTUK HTTPS
//const server = http.createServer(app);
async function startServer() {
  http.createServer(App).listen(PORT, () => {
    connectDb();
    console.log(`Listen to PORT ${PORT} ....`);
  });
}

startServer();