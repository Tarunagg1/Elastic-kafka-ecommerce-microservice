import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';


export class CreateProductRequest {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;

    @IsNotEmpty()
    @Min(1)
    price: number

    @IsNumber()
    stock: number;
}


export class UpdateProductRequest {
    name?: string;

    description?: string;

    price?: number;

    @IsNumber()
    stock?: number;
}
