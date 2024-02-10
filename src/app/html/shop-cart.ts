import { Component, ElementRef, QueryList, ViewChild } from "@angular/core";
import { Order } from "../model/order";
import { ShoppingcartService } from "../_services/shoppingcart.service";
import { ProductEnum } from "../model/Enum/ProductEnum";

@Component({
    selector: 'shopcart',
    templateUrl: '../html/shop-cart.html',
    styleUrls: ["../../assets/vendor/css/bundle.min.css", "../../assets/vendor/css/LineIcons.min.css", "../../assets/vendor/css/cubeportfolio.min.css", "../../assets/vendor/css/jquery.fancybox.min.css",
        "../../assets/vendor/css/owl.carousel.min.css", "../../assets/vendor/css/swiper.min.css", "../../assets/vendor/css/wow.css", "../../assets/vendor/css/LineIcons.min.css", "../../assets/vendor/css/bundle.min.css",
        "../../assets/vendor/css/cubeportfolio.min.css", '../../styles.css', "../../assets/vendor/css/jquery.fancybox.min.css", "../../assets/vendor/css/owl.carousel.min.css", "../../assets/vendor/css/swiper.min.css", "../../assets/vendor/css/wow.css"],
})
export class ShopcartComponent {
    orders: Order[] = [];
    errorMessage = "";

    constructor(private shoppingcartService: ShoppingcartService) { }
    ngOnInit(): void {
        this.orders = this.shoppingcartService.getOrders();
    }

    getProductsPrice() {
        var sum = 0;
        for (let i = 0; i < this.orders.length; i++) {
            sum += (this.orders[i].product.price * this.orders[i].number);
        }
        return sum;
    }

    getTotalPrice() {
        return this.getProductsPrice();
    }

    buyOrders() {
        window.close()
        this.shoppingcartService.setOrdersToCart(this.orders);
        this.shoppingcartService.buyShoppingCart().subscribe({
            next: data => {

                return new Promise<boolean>((resolve, reject) => {
                    try { 
                        window.location.href = data.message; // Wijzig de huidige locatie
                        resolve(true);
                    }
                    catch (e) { reject(e); }
                });
            },
            error: err => {
                this.errorMessage = err.error.message;
                console.log(this.errorMessage);
            }
        });
    }

    removeOrder(order: Order) {
        this.shoppingcartService.removeOrder(order);
        window.location.reload();
    }

    getOrderSize(order: Order): string {
        if (order && order.product.productType != ProductEnum.TOKEN) {
            return "(" + order.size.replace('_', '') + ")";
        }
        return '';
    }
}