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


    

    constructor(id: Number, categorie: String, name: string,price: number,description: String,imageLoc: String,numberOfShirts: BigInteger, productType: ProductEnum) {
        this.description = description;
        this.id = id;
        this.imageLoc = imageLoc;
        this.category = categorie;
        this.name = name;
        this.numberOfShirts = numberOfShirts;
        this.price = price;
        this.productType=productType;
    }
}