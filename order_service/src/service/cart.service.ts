import { CartLineItem } from "../db/schema";
import { CartRequestInput } from "../dto/cartRequest.dto";
import { CartRepositoryType } from "../repository/cart.repository";
import { logger } from "../utils";
import { GetProductDetails } from "../utils/broker/api";
import { NotFoundError } from "../utils/error/errors";


export const CreateCart = async (input: CartRequestInput, repo: CartRepositoryType) => {
    const productData = await GetProductDetails(input['productId']);
    // logger.info(productData);
    if (!productData || productData.stock < input.qty) {
        throw new NotFoundError("product is out of stock");
    }

    return await repo.createCart(input.customerId, {
        productId: productData.id,
        price: productData.price.toString(),
        qty: input.qty,
        itemName: Date.now().toString(),
        variant: "pko"
    } as CartLineItem);

}

export const GetCart = async (input: any, repo: CartRepositoryType) => {
    const data = await repo.findCart(input);
    return data;
}

export const EditCart = async (input: any, repo: CartRepositoryType) => {
    const data = await repo.updateCart(1, 1);
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
