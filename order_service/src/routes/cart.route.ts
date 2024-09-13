import express, { NextFunction, Request, Response } from "express";
import * as cartService from "../service/cart.service";
import { CartRepository } from '../repository/cart.repository';
import { Validaterequest } from "../utils/validator";
import { CartRequestInput, CartRequestSchema } from "../dto/cartRequest.dto";

const router = express.Router();
const repo = CartRepository;

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // jwt
    const isValidUser = true;
    if (!isValidUser) {
        return res.status(403).json({ error: "authorization error" });
    }
    next();
};


router.post("/cart", authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
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
        const response = await cartService.GetCart(req.body.customerId, repo);
        return res.status(200).json(response);
    } catch (error) {
        // const err = error as Error;
        next(error);
        // return res.status(500).json({ error: err.message });
    }
});


router.patch("/cart/:lineItemId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { lineItemId } = req.params;
        const response = await cartService.EditCart(
            {
                id: +lineItemId,
                qty: req.body.qty,
            }, repo);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
        // const err = error as Error;
        // return res.status(500).json({ error: err.message });
    }
})


router.delete("/cart/lineItemId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { lineItemId } = req.params;
        console.log(lineItemId);
        const response = await cartService.DeleteCart(+lineItemId, repo);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
        // const err = error as Error;
        // return res.status(500).json({ error: err.message });
    }
})



router.post("/clear-cart/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const response = await cartService.ClearCart(id, repo);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
        // const err = error as Error;
        // return res.status(500).json({ error: err.message });
    }
})

export default router;
