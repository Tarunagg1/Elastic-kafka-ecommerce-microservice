
type Create = (input: any) => Promise<{}>;
type Find = (input: any) => Promise<{}>;
type Update = (input: any) => Promise<{}>;
type Delete = (input: any) => Promise<{}>;
type clearCartData = (id: number) => Promise<{}>;


export type CartRepositoryType = {
    createCart: Create,
    findCart: Find,
    updateCart: Update,
    deleteCart: Delete,
    clearCartData: clearCartData
}