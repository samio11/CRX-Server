import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { GlobalErrorHandler } from "./app/middlewares/GlobalErrorHandler";
import { NotFound } from "./app/middlewares/NotFound";
import { rootRouter } from "./app/routes";

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", rootRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is running successfully🚕" });
});

app.use(GlobalErrorHandler);
app.use(NotFound);

export default app;
