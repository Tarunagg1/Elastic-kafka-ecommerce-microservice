export enum OrderEvent {
    CREATE_ORDER = 'CREATE_ORDER',
    CANCLE_ORDER = 'CANCEL_ORDER'
}

export type TOPIC_TYPE = "OrderEvents" | "CatelogEvents";


export interface MessageType {
    headers?: Record<string, any>;
    event: OrderEvent,
    data: Record<string, any>;
}

