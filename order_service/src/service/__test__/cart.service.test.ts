import { CartRepositoryType } from '../../types/repository.type';
import { CartRepository } from '../../repository/cart.repository';
import { CreateCart } from '../cart.service';


describe("CartService", () => {

    let repo: CartRepositoryType;

    beforeEach(() => {
        repo = CartRepository;
    });

    afterEach(() => {
        repo = {} as CartRepositoryType;
    });


    it("should return correct data while creating cart", async () => {
        const mockCart = {
            title: "smart phone",
            amount: 1200,
        };

        jest.spyOn(CartRepository, "createCart").mockImplementationOnce(() =>
            Promise.resolve({
                message: "fake response from cart repository",
                input: mockCart,
            })
        );

        const res = await CreateCart(mockCart, repo);

        expect(res).toEqual({
            message: "fake response from cart repository",
            input: mockCart,
        });
    });


})