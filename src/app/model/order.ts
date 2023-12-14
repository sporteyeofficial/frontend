import { ProductEnum } from "./Enum/ProductEnum";
import { Product } from "./product";

export class Order {
    id: number;
    product: Product;
    size: String;
    number: number;
    productName: String;
    shirtShown: boolean;
    productEnum: String;
    tokenEnum: String;
    changeUsed: number;
    cheatUsed: number;

    constructor(id: number, product: Product, number: number, size: String, productName: String, shirtShown: boolean, productType: String, tokenEnum: string, changeUsed: number, cheatUsed: number) {
        this.id = id;
        this.product = product;
        this.size = size;
        this.productName=productName;
        this.number = number;
        this.shirtShown=shirtShown;
        this.productEnum=productType;
        this.tokenEnum = tokenEnum;
        this.changeUsed = changeUsed;
        this.cheatUsed = cheatUsed;
    }

}