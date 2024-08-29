export class Product {
    constructor(
        public name: string,
        public readonly description: string,
        public price: number,
        public readonly stock: number,
        public readonly id?: number
    ) { }
}