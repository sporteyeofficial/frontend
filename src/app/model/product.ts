import { ProductEnum } from "./Enum/ProductEnum";

export class Product {
    id: Number;
    name: string;
    price: number;
    description: String;
    imageLoc: String;
    numberOfShirts: BigInteger;
    category: String;
    productType: ProductEnum;
    sizes: any[];


    constructor(id: Number, categorie: String, name: string,price: number,description: String, imageLoc: String,numberOfShirts: BigInteger, productType: ProductEnum, sizes: any[]) {
        this.description = description;
        this.id = id;
        this.imageLoc = imageLoc;
        this.category = categorie;
        this.name = name;
        this.numberOfShirts = numberOfShirts;
        this.price = price;
        this.productType=productType;
        this.sizes = sizes;
    }
}