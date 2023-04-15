import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import createError from "http-errors";
import router from "./routers/router";

const prisma = new PrismaClient();
const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(express.json());


app.listen(3000, () =>
  console.log(`⚡️[server]: Server is running at https://localhost:3000`)
);

app.use('/', router());

// handle 404 error
// app.use((req: Request, res: Response, next: Function) => {
//   next(createError(404));
// });




