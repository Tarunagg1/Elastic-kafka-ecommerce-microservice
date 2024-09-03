import { ICatalogRepository } from "../interface/catelogRepository.interface";
import { Product } from "../models/product.model";

export class CatalogRepository implements ICatalogRepository {
    async create(data: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    async update(data: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    async delete(id: number) {
        throw new Error("Method not implemented.");
    }
    async find(limit: number, offset: number): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
    async findOne(id: number): Promise<Product> {
        throw new Error("Method not implemented.");
    }

}