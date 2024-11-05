import express, { NextFunction, Request, Response } from "express";
import * as cartService from "../service/cart.service";
import { CartRepository } from '../repository/cart.repository';
import { Validaterequest } from "../utils/validator";
import { CartRequestInput, CartRequestSchema } from "../dto/cartRequest.dto";
import { RequestAuthorizer } from "./middleware";

const router = express.Router();
const repo = CartRepository;


router.post("/cart", RequestAuthorizer, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        if (!user) {
            next(new Error("User not found"));
            return;
        }


        const error = Validaterequest<CartRequestInput>(req.body, CartRequestSchema);
        if (error) {
            return res.status(404).json({ error });
        }

        const input: CartRequestInput = req.body;

        const response = await cartService.CreateCart({
            ...input,
            customerId: user.id
        }, repo);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
        // const err = error as Error;
        // return res.status(500).json({ error: err.message });
    }
});

router.get("/cart", RequestAuthorizer, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        if (!user) {
            next(new Error("User not found"));
            return;
        }
        const response = await cartService.GetCart(user.id, repo);
        return res.status(200).json(response);
    } catch (error) {
        // const err = error as Error;
        next(error);
        // return res.status(500).json({ error: err.message });
    }
});


router.patch("/cart/:lineItemId", RequestAuthorizer, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        if (!user) {
            next(new Error("User not found"));
            return;
        }

        const { lineItemId } = req.params;
        const response = await cartService.EditCart(
            {
                id: +lineItemId,
                qty: req.body.qty,
                customerId: user.id
            }, repo);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
        // const err = error as Error;
        // return res.status(500).json({ error: err.message });
    }
})


router.delete("/cart/:lineItemId", RequestAuthorizer, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        if (!user) {
            next(new Error("User not found"));
            return;
        }


        const { lineItemId } = req.params;
        console.log(lineItemId);
        const response = await cartService.DeleteCart({
            customerId: user.id,
            id: +lineItemId
        }, repo);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
        // const err = error as Error;
        // return res.status(500).json({ error: err.message });
    }
})



router.post("/clear-cart/:id", RequestAuthorizer, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        if (!user) {
            next(new Error("User not found"));
            return;
        }

        const { id } = req.params;
        const response = await cartService.ClearCart({
            id: +id,
            customerId: user.id
        }, repo);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
        // const err = error as Error;
        // return res.status(500).json({ error: err.message });
    }
})

export default router;
