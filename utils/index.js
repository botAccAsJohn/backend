import express from "express";
import dotenv from "dotenv";
import CookieParser from "cookie-parser";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

dotenv.config({
  path: "./.env",
});

// const corsOptions = {
//   origin: process.env.CORS,
//   optionsSuccessStatus: 200,
//   credentials: true
// };



const app = express();

const expressServer = () => {


  // middelewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // app.use(cors(corsOptions));

  app.use(cors({
    origin: "http://localhost:5173", // Allow frontend
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true
  }));
  app.use(CookieParser());

  return app;
};

export default expressServer;