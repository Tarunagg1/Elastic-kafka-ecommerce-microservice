import { CartLineItem } from "../db/schema";
import { CartEditRequestInput, CartRequestInput } from "../dto/cartRequest.dto";
import { CartRepositoryType } from "../repository/cart.repository";
import { logger } from "../utils";
import { GetProductDetails, GetStockDetails } from "../utils/broker/api";
import { AuthorizeError, NotFoundError } from "../utils/error/errors";

const AuthorisedCart = async (lineItemId: number, customerId: number, repo: CartRepositoryType) => {
    const cart = await repo.findCart(customerId);
    if (!cart) {
        throw new NotFoundError("cart does not exist");
    }
    const lineItem = cart.lineItems.find((item) => item.id === lineItemId);
    if (!lineItem) {
        throw new AuthorizeError("you are not authorized to edit this cart");
    }

    return lineItem;
}


export const CreateCart = async (input: CartRequestInput & { customerId: number }, repo: CartRepositoryType) => {
    const productData = await GetProductDetails(input['productId']);
    logger.info(productData);

    if (!productData || productData.stock < input.qty) {
        throw new NotFoundError("product is out of stock");
    }

    // find if the product is already in cart
    const lineItem = await repo.findCartByProductId(input.customerId, input.productId);

    if (lineItem) {
        return repo.updateCart(lineItem.id, lineItem.qty + input.qty);
    }

    return await repo.createCart(input.customerId, {
        productId: productData.id,
        price: productData.price.toString(),
        qty: input.qty,
        itemName: Date.now().toString(),
        variant: "pko"
    } as CartLineItem);
}

export const GetCart = async (id: any, repo: CartRepositoryType) => {
    // get customer cart data
    const cart = await repo.findCart(id);
    if (!cart) {
        throw new NotFoundError("cart does not exist");
    }

    // list out all line items in the cart
    const lineItems = cart.lineItems;

    if (!lineItems.length) {
        throw new NotFoundError("cart items not found");
    }

    // verify with inventory service if the product is still available
    const stockDetails = await GetStockDetails(lineItems.map((item) => item.productId));

    if (Array.isArray(stockDetails)) {
        lineItems.forEach((lineItem) => {
            const stockItem = stockDetails.find((stock) => stock.id === lineItem.productId);
            if (stockItem) {
                lineItem.availability = stockItem.stock;
            }
        });

        cart.lineItems = lineItems;
    }

    // return updated cart data with latest stock availability
    return cart;
}

export const EditCart = async (input: CartEditRequestInput & { customerId: number }, repo: CartRepositoryType) => {
    await AuthorisedCart(input.id, input.customerId, repo);
    const data = await repo.updateCart(input.id, input.qty);
    return data;

}

export const DeleteCart = async (input: { customerId: number, id: number }, repo: CartRepositoryType) => {
    const data = await repo.deleteCart(input.id);
    return data;

}


export const ClearCart = async (input: { customerId: number, id: number }, repo: CartRepositoryType) => {
    await AuthorisedCart(input.id, input.customerId, repo);

    const data = await repo.clearCartData(input.id);
    return data;

}
