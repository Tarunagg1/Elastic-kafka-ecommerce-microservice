import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { httpLogger } from "./utils";
import cartRoutes from './routes/cart.route';
// import orderRoutes from './routes/ordrer.route';


const app = express();
app.use(cors());
app.use(express.json());
app.use(httpLogger);

app.use(cartRoutes);
// app.use(orderRoutes);

app.use("/", (req: Request, res: Response, _: NextFunction) => {
    return res.status(200).json({ message: "I am healthy!" });
});

export default app;
