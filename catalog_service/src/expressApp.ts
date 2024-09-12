import express from "express";
import catalogRouter from './api/catalog.routes';
import { HandleErrorWithLogger } from "./utils";

const app = express();
app.use(express.json());

app.use("/", catalogRouter);

app.use(HandleErrorWithLogger);

export default app;
