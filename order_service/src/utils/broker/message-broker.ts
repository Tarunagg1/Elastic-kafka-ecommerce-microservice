import { MessageBrokerType, MessageHadler, PublishType } from "./broket.type";
import { Consumer, Kafka, logLevel, Partitioners, Producer } from 'kafkajs';
import fs from 'fs';
import path from 'path';
import { TOPIC_TYPE } from "../../types";

const CLIENT_ID = process.env.CLIENT_ID || 'order-service';
const GROUP_ID = process.env.GROUP_ID || 'order-service-group';
const BROKERS = [process.env.KAFKA_BROKER];


const kafka = new Kafka({
    clientId: CLIENT_ID,
    brokers: BROKERS as [string],
    logLevel: logLevel.INFO,
    ssl: {
        ca: [fs.readFileSync(path.join(__dirname, 'kafka.pem'), 'utf-8')]
    },
    sasl: {
        username: process.env.KAFKA_USERNAME,
        password: process.env.KAFKA_PASSWORD,
        mechanism: 'plain'
    } as any
});


let consumer: Consumer;
let producer: Producer;


const createTopic = async (topic: string[]) => {
    const topics = topic.map((topicName: string) => ({
        topic: topicName,
        numPartitions: 2,
        replicationFactor: 1
    }));

    const admin = kafka.admin();
    await admin.connect();

    const topicExists = await admin.listTopics();

    for (const t of topics) {
        if (!topicExists.includes(t.topic)) {
            await admin.createTopics({
                topics: [t]
            })
        }
    }
    await admin.disconnect();
}


const connectProducer = async <T>(): Promise<T> => {
    await createTopic(["OrderEvents"]);

    if (producer) {
        return producer as unknown as T;
    }

    producer = kafka.producer({
        createPartitioner: Partitioners.DefaultPartitioner
    });

    await producer.connect();
    return producer as unknown as T;
}

const disconnectProducer = async (): Promise<void> => {
    if (producer) {
        await producer.disconnect();
    }
}

const publish = async (data: PublishType): Promise<boolean> => {
    const producer = connectProducer<Producer>();

    const result = await (await producer).send({
        topic: data.topic,
        messages: [
            {
                headers: data.headers,
                key: data.event,
                value: JSON.stringify(data.message)
            }
        ]
    });

    console.log('publishing result:', result);
    return result.length > 0;
}

const connectConsumer = async <T>(): Promise<T> => {
    if (consumer) {
        return consumer as unknown as T;
    }

    consumer = kafka.consumer({
        groupId: GROUP_ID
    });

    await consumer.connect();
    return consumer as unknown as T;
}

const disconnectConsumer = async (): Promise<void> => {
    if (consumer) {
        await consumer.disconnect();
    }
}

const subscribe = async  <T>(messageHandler: MessageHadler, topic: TOPIC_TYPE): Promise<void> => {
    const consumer = await connectConsumer<Consumer>();

    await consumer.subscribe({ topic: topic, fromBeginning: true });

    
}

export const MessageBroker: MessageBrokerType = {

    connectProducer: function <T>(): Promise<T> {
        throw new Error("Function not implemented.");
    },
    disconnectProducer: function (): Promise<void> {
        throw new Error("Function not implemented.");
    },
    publish: function (data: PublishType): Promise<boolean> {
        throw new Error("Function not implemented.");
    },
    connectConsumer: function <T>(): Promise<T> {
        throw new Error("Function not implemented.");
    },
    disconnectConsumer: function (): Promise<void> {
        throw new Error("Function not implemented.");
    },
    subscribe: function <T>(messageHandler: MessageHadler, topic: string): Promise<void> {
        throw new Error("Function not implemented.");
    }
}