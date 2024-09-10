import { DB } from "../db/db.connection";
import { carts } from "../db/schema";
import { CartRepositoryType } from "../types/repository.type";

const createCart = async function (input: any): Promise<{}> {
    const result = await DB.insert(carts)
        .values(input).returning()
        .onConflictDoUpdate({
            target: carts.customerId,
            set: { updatedAt: new Date() },
        });
    return Promise.resolve({ message: "Message from cart repository", result });
};

const findCart = async (input: any): Promise<{}> => {
    return Promise.resolve({ message: "Message from cart repository" });
};

const updateCart = async (input: any): Promise<{}> => {
    return Promise.resolve({ message: "Message from cart repository" });
}

const deleteCart = async (input: any): Promise<{}> => {
    return Promise.resolve({ message: "Message from cart repository" });
}

const clearCartData = async (input: any): Promise<{}> => {
    return Promise.resolve({ message: "Message from cart repository" });
}


export const CartRepository: CartRepositoryType = {
    createCart: createCart,
    findCart: findCart,
    updateCart: updateCart,
    deleteCart: deleteCart,
    clearCartData: clearCartData
}