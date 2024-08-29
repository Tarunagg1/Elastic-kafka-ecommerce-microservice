import express, { NextFunction, Request, Response } from "express";
import { CatalogService } from "../services/catalog.service";
import { CatalogRepository } from "../repository/catalog.reposoitory";

const router = express.Router();

export const catalogService = new CatalogService(new CatalogRepository());

router.post("/product", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await catalogService.createProduct(req.body);
        return res.status(201).json({ messsage: "helllo" });
    } catch (error) {
        console.log(error);
    }
})


export default router;
