import express, { NextFunction, Request, Response } from "express";
import * as cartService from "../service/cart.service";
import { CartRepository } from '../repository/cart.repository';
import { Validaterequest } from "../utils/validator";
import { CartRequestInput, CartRequestSchema } from "../dto/cartRequest.dto";

const router = express.Router();
const repo = CartRepository;

router.post("/cart", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const error = Validaterequest<CartRequestInput>(req.body, CartRequestSchema);
        if (error) {
            return res.status(404).json({ error });
        }

        const response = await cartService.CreateCart(req.body, repo);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
        // const err = error as Error;
        // return res.status(500).json({ error: err.message });
    }
});

router.get("/cart", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = cartService.GetCart("oji", repo);
        return res.status(200).json({ message: "create cart" });
    } catch (error) {
        // const err = error as Error;
        next(error);
        // return res.status(500).json({ error: err.message });
    }
});


router.patch("/cart", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = cartService.EditCart("oji", repo);
        return res.status(200).json({ message: "create cart" });
    } catch (error) {
        next(error);
        // const err = error as Error;
        // return res.status(500).json({ error: err.message });
    }
})


router.delete("/cart", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = cartService.DeleteCart("oji", repo);
        return res.status(200).json({ message: "create cart" });
    } catch (error) {
        next(error);
        // const err = error as Error;
        // return res.status(500).json({ error: err.message });
    }
})



router.post("/clear-cart", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = cartService.CreateCart("oji", repo);
        return res.status(200).json({ message: "create cart" });
    } catch (error) {
        next(error);
        // const err = error as Error;
        // return res.status(500).json({ error: err.message });
    }
})

export default router;
