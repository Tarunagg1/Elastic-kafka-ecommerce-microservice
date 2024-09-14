import { MessageType, OrderEvent, TOPIC_TYPE } from "../../types";

export interface PublishType {
    headers: Record<string, any>;
    topic: TOPIC_TYPE;
    event: OrderEvent;
    message: Record<string, any>;
}

export type MessageHadler = (input: MessageType) => void;



export type MessageBrokerType = {
    connectProducer: <T>() => Promise<T>;
    disconnectProducer: () => Promise<void>;
    publish: (data: PublishType) => Promise<boolean>;

    connectConsumer: <T>() => Promise<T>;
    disconnectConsumer: () => Promise<void>;
    subscribe: <T>(messageHandler: MessageHadler, topic: TOPIC_TYPE) => Promise<void>;
};

