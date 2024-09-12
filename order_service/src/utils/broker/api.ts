import axios from "axios";
import { logger } from "../logger/logger";
import { NotFoundError } from "../error/errors";
import { Product } from "../../dto/product.dto";

const CATALOG_BASE_URL = process.env.CATALOG_BASE_URL || "http://localhost:8000"; // env variable


export const GetProductDetails = async (productId: number) => {
    try {
        const response = await axios.get(`${CATALOG_BASE_URL}/product/${productId}`);
        return response.data as Product;
    } catch (error) {
        logger.error(error);
        throw new NotFoundError("product not found");
    }
};

