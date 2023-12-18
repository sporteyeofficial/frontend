import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { StorageService } from "./_services/storage.service";
import { UserServiceService } from "./_services/user-service.service";
import { Product } from "./model/product";
import { ShoppingcartService } from "./_services/shoppingcart.service";
import { Order } from "./model/order";
import { ProductService } from "./_services/product.service";
import { MatDialog } from "@angular/material/dialog";
import { WijzigProfielComponent } from "./wijzigProfielModal";
import { ChatBotComponent } from "./chatbotwindow";

@Component({
    selector: 'app-root',
    templateUrl: 'root.html',
    styleUrls: ["../assets/vendor/css/bundle.min.css","../assets/vendor/css/jquery.fancybox.min.css","../assets/vendor/css/cubeportfolio.min.css",
  "../assets/vendor/css/wow.css","../assets/vendor/css/LineIcons.min.css",'../styles.css',"../assets/vendor/css/swiper.min.css","../assets/vendor/css/owl.carousel.min.css"],
  })
  export class AppComponent {
    currentUser: any;
    isLoggedIn: any;
    errorMessage='';
    orders: Order[] = [];
    cheatTokens = 0;
    changeTokens = 0;

  constructor(private router: Router, private storageService: StorageService, private dialog: MatDialog, private UserService: UserServiceService, private shoppingcartService: ShoppingcartService, private productService: ProductService) { }
  
  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.orders = this.shoppingcartService.getOrders();
    if (this.currentUser != null) {
      this.cheatTokens = this.currentUser.cheatTokens;
      this.changeTokens = this.currentUser.changeTokens;
    }
    
  }

  toggleChat(): void {
    const dialogRef = this.dialog.open(ChatBotComponent, {
      width: '70%',
      height: '70%',
      data: {  }
    });
    console.log("dialog is opened");

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  giveAuthorityString(role: string) {
      if (this.currentUser == null) {
        return false;
      }
      for(let authority of this.currentUser.authorities){
        if (authority.authority == "ROLE_" + role){
          return true;
        }
      }
      return false;
  }

  deleteAllOrders() {
    this.shoppingcartService.removeOrders();
    window.location.reload();
  }

  wijzigProfiel() {
    const dialogRef = this.dialog.open(WijzigProfielComponent, {
      panelClass: 'dialogclass',
      data: {}
    });
    console.log("dialog is opened");

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  goAboutUs() {
    this.router.navigate(['about']).then(() => {
      window.location.reload();
    });
  }

  goVoorwaarden() {
    this.router.navigate(['policy']).then(() => {
      window.location.reload();
    });
  }

  logout() {
    
    this.UserService.logout().subscribe({
      next: data => {
        console.log(data);
        this.storageService.clean();
        window.location.reload();
        this.currentUser = null;
        this.isLoggedIn = false;
        this.router.navigate(['login?message=Gebruiker succesvol uitgelogd']).then(() => {
          window.location.reload();
        });
      },
      error: err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
      }
    });
  }

  getProductsPrice() {
    var sum = 0;
    for (let i = 0; i < this.orders.length; i++) {
      sum+=(this.orders[i].product.price*this.orders[i].number);
    }
    return sum;
  }

  seeOrders() {
    this.router.navigate(['check/0/order/0']).then(() => {
      window.location.reload();
    });
  }

  removeOrder(order:Order) {
    this.shoppingcartService.removeOrder(order);
  }

  goCheckout() {
    this.router.navigate(['shopCart']).then(() => {
      window.location.reload();
    });
  }

  fetchShirts() {
    this.productService.fetchShirts().subscribe({
      next: data => {
        window.location.reload();
      },
      error: err => {
        this.errorMessage = err.error.message;
      
      }
    });
  }

  fetchClubs() {
    this.productService.fetchClubs().subscribe({
      next: data => {
        window.location.reload();
      },
      error: err => {
        this.errorMessage = err.error.message;
      
      }
    });
  }


  }