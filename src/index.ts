import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import createError from "http-errors";
import router from "./routes";

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

app.use("/", router);

app.use((req: Request, res: Response, next: Function) => {
  next(createError(404));
});

app.listen(3000, () =>
  console.log(`⚡️[server]: Server is running at https://localhost:3000`)
);
