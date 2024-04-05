import { Component, ElementRef, QueryList, ViewChild } from "@angular/core";
import { Order } from "../model/order";
import { ShoppingcartService } from "../_services/shoppingcart.service";
import { ProductEnum } from "../model/Enum/ProductEnum";
import { MatDialog } from "@angular/material/dialog";
import { PaymentWindowComponent } from "../paymentwindow";

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
    payPushed = false;
    constructor(private shoppingcartService: ShoppingcartService, private dialog: MatDialog,) { }
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
        
        this.shoppingcartService.setOrdersToCart(this.orders);
        this.shoppingcartService.buyShoppingCart().subscribe({
            next: data => {
                this.payPushed = true;
                const dialogRef = this.dialog.open(PaymentWindowComponent, {
                    width: 'max-content',
                    height: 'max-content',
                    data: { sdata: data.sessionData, sid: data.id }
                });
                console.log("dialog is opened");
                    
                dialogRef.afterClosed().subscribe(result => {
                    console.log('The dialog was closed');
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