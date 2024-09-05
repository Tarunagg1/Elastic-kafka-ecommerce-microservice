import { CartRepositoryType } from "../types/repository.type";

const createCart = function (input: any): Promise<{}> {
    return Promise.resolve({ message: "Message from cart repository" });
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