import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "../model/product";
import { Order } from "../model/order";
import { Observable } from "rxjs";
import { frontend } from "../../environments";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json'}),
  withCredentials: true
};

@Injectable({
    providedIn: 'root'
  })
  export class ShoppingcartService {
    public orders: Order[]=[];
    private apiUrl = frontend.url;

    constructor(private http: HttpClient) {

    }
    
    addProductToShoppingcart(product: Product, number: any ,size: any) {
        this.orders = JSON.parse(localStorage.getItem("orders") || '[]');
        let order = new Order(this.orders.length, product,number,size, "", false, "", "", 0, 0);
        this.orders.push(order);
        localStorage.setItem("orders", JSON.stringify(this.orders));
        window.location.reload();
    }

    buyShoppingCart() : Observable<any> {
      this.orders = JSON.parse(localStorage.getItem("orders") || '[]');
      localStorage.setItem("orders", JSON.stringify([]));
      return this.http.post(`${this.apiUrl}/user/buy`, JSON.stringify(this.orders), httpOptions);
    }

    removeOrders() {
      localStorage.setItem("orders", JSON.stringify([]));
    }

    removeOrder(order: Order) {
        this.orders = JSON.parse(localStorage.getItem("orders") || '[]');
        this.orders.forEach((element, index)  =>{
          if(element.id==order.id) this.orders.splice(index,1);
        });
        console.log(this.orders);
        localStorage.setItem("orders", JSON.stringify(this.orders));
    }

    getOrders() {
      return JSON.parse(localStorage.getItem("orders") || '[]');
    }
  }