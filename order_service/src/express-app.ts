import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { HandleErrorWithLogger, httpLogger } from "./utils";
import cartRoutes from './routes/cart.route';
import { MessageBroker } from "./utils/broker";
import { Consumer, Producer } from "kafkajs";
import { MessageType } from "./types";
import orderRoutes from './routes/order.rotes';


export const ExpressApp = async () => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(httpLogger);

    try {

        // Kafka js implementation
        const producer = await MessageBroker.connectProducer<Producer>();
        producer.on('producer.connect', () => {
            console.log('producer connected');
        })

        const consumer = await MessageBroker.connectConsumer<Consumer>();
        consumer.on('consumer.connect', () => {
            console.log('consumer connected');
        });

        await MessageBroker.subscribe((message: MessageType) => {
            console.log('comsumer recive message');
            console.log('message received', message);

        }, "OrderEvents");
    } catch (error) {
        console.log(error);
    }


    app.use(cartRoutes);
    app.use(orderRoutes);


    app.use("/", (req: Request, res: Response, _: NextFunction) => {
        return res.status(200).json({ message: "I am healthy!" });
    });


    app.use(HandleErrorWithLogger);
    return app;
}



// export default app;
