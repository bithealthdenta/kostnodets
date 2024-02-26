import express from "express";
import jwt from 'jsonwebtoken';
const authRoute=express.Router();
//const getUser=require('./auth.controller');
import {login}from './auth.controller';

authRoute.post('/login',login);

export const AuthRoute = authRoute;