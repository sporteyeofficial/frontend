import { Order } from "./order";

export class OrderGroup {
    id: number;
    omschrijving: String;
    startDate: Date;
    status: String;
    description: String;
    orders: Order[];

    constructor(id: number, status: String, omschrijving: String, startDate: Date, description: String, orders: Order[]) {
        this.id = id;
        this.description=description;
        this.startDate = startDate;
        this.omschrijving = omschrijving;
        this.status = status;
        this.orders = orders;
    }

}