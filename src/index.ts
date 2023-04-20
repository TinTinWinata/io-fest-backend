import express, { Request, Response } from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import createError from "http-errors";
import router from "./routes";
import dotenv from "dotenv";
import path from "path";

declare global {
  namespace Express {
    export interface Request {
      jwtPayload?: any;
      fileValidationError?: string;
    }
  }
}

dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(express.json());

// console.log(path.join(__dirname, "public", "profilePicture"))

// app.use("/static", express.static(path.join(__dirname, "public", "profilePicture")));
app.use("/", router);

// handle 404 error
app.use((req: Request, res: Response, next: Function) => {
  next(createError(404));
});

app.listen(3000, () =>
  console.log(`⚡️[server]: Server is running at https://localhost:3000`)
);
