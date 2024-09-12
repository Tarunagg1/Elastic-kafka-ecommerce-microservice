import { Product } from "../dto/product.dto";
import { CartRepositoryType } from "../types/repository.type"
import { logger } from "../utils";
import { GetProductDetails } from "../utils/broker/api";
import { NotFoundError } from "../utils/error/errors";


export const CreateCart = async (input: any, repo: CartRepositoryType) => {
    console.log(input);

    const productData = await GetProductDetails(input['productId']);
    logger.info(productData);
    if (!productData || productData.stock < input.qty) {
        throw new NotFoundError("product is out of stock");
    }

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
