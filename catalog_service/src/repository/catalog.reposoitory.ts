import { NotFoundError } from "@prisma/client/runtime/library";
import { ICatalogRepository } from "../interface/catelogRepository.interface";
import { Product } from "../models/product.model";
import { PrismaClient } from '@prisma/client';


export class CatalogRepository implements ICatalogRepository {
    _prisma: PrismaClient;

    constructor() {
        this._prisma = new PrismaClient();
    }

    async create(data: Product): Promise<Product> {
        return this._prisma.product.create({ data });
        // throw new Error("Method not implemented.");
    }

    async update(data: Product): Promise<Product> {
        return this._prisma.product.update({
            where: {
                id: data.id
            }, data
        });
        throw new Error("Method not implemented.");
    }

    async delete(id: number) {
        return this._prisma.product.delete({
            where: { id },
        });
        throw new Error("Method not implemented.");
    }

    async find(limit: number, offset: number): Promise<Product[]> {
        return this._prisma.product.findMany({
            take: limit,
            skip: offset,
        });
        throw new Error("Method not implemented.");
    }

    async findOne(id: number): Promise<Product> {
        const product = await this._prisma.product.findFirst({
            where: { id },
        });
        if (product) {
            return Promise.resolve(product);
        }
        throw new Error("product not found.");

        // throw new NotFoundError("product not found");
    }
}