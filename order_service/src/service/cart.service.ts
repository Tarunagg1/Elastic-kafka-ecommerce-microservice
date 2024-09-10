import { CartRepositoryType } from "../types/repository.type"


export const CreateCart = async (input: any, repo: CartRepositoryType) => {
    const data = await repo.createCart(input);
    return data;
}

export const GetCart = async (input: any, repo: CartRepositoryType) => {
    const data = await repo.findCart(input);
    return data;
}

export const EditCart = async (input: any, repo: CartRepositoryType) => {
    const data = await repo.updateCart(input);
    return data;

}

export const DeleteCart = async (input: any, repo: CartRepositoryType) => {
    const data = await repo.deleteCart(input);
    return data;

}


export const ClearCart = async (input: any, repo: CartRepositoryType) => {
    const data = await repo.clearCartData(input);
    return data;

}
