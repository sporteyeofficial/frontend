import { Component, NgZone, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserServiceService } from "../_services/user-service.service";
import { Order } from "../model/order";
import { Subject, take, takeUntil } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { Window2Component } from "../modelwindow2";
import { OrderService } from "../_services/order.service";
import { Shirt } from "../model/shirt";
import { StorageService } from "../_services/storage.service";
import { MysterieShirt } from "../model/mysterieShirt";
import { Window3Component } from "../modelwindow3";
import { WindowerrorComponent } from "../errorwindow";
import { OrderGroup } from "../model/orderGroup";

@Component({
  selector: 'orders',
  templateUrl: 'orders2.html',
  styleUrls: ["../../assets/vendor/css/bundle.min.css", "../../assets/vendor/css/LineIcons.min.css", "../../assets/vendor/css/cubeportfolio.min.css", "../../assets/vendor/css/jquery.fancybox.min.css",
    "../../assets/vendor/css/owl.carousel.min.css", "../../assets/vendor/css/swiper.min.css", "../../assets/vendor/css/wow.css", "../../assets/vendor/css/LineIcons.min.css", "../../assets/vendor/css/bundle.min.css",
    "../../assets/vendor/css/cubeportfolio.min.css", '../../styles.css', "../../assets/vendor/css/jquery.fancybox.min.css", "../../assets/vendor/css/owl.carousel.min.css", "../../assets/vendor/css/swiper.min.css", "../../assets/vendor/css/wow.css"],


})
export class OrderComponent implements OnInit {
  public id: any = String;
  public groupid: any = String;
  public orderGroups: OrderGroup[] = [];
  public pickedShirts: MysterieShirt[] = [];
  public beforeChangeShirts: Shirt[] = [];
  public order: Order | Record<string, never> = {};
  public orderGroup: OrderGroup | Record<string, never> = {};
  cheatTokens = 0;
  changeTokens = 0;
  page = 1;
  count = 0;
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  timer: any;
  pageSize = 3;
  isLoaded = false;
  docBreedte = window.innerWidth
  docHoogte = window.innerHeight

  constructor(private route: ActivatedRoute, private userService: UserServiceService, private dialog: MatDialog, private orderService: OrderService, private storageService: StorageService, private router: Router) {

  }

  ngOnInit(): void {
    this.getOrders(1, this.pageSize);
    this.timer = setInterval(() => this.calculateRemainingTime(), 1000);
  }

  isLoggedIn() {
    return this.storageService.isLoggedIn()
  }

  getOrderGroupTokens() {
    for (let order of this.orderGroup.orders) {
      if (order.productEnum == 'TOKEN') {
        if (order.tokenEnum == "CHEAT") {
          this.cheatTokens += order.number;
        } else if (order.tokenEnum == "CHANGE") {
          this.changeTokens += order.number;
        }
      }
    }
  }

  getShirtOrdersIndexes(): number[] {
    let shirtIndexes: number[] = [];
    for (let i in this.orderGroup.orders) {
      if (this.orderGroup.orders[i].productEnum != 'TOKEN') {
        shirtIndexes.push(parseInt(i));
      }
    }
    return shirtIndexes;
  }

  changeOrderOfGroup(i: number) {
    this.router.navigate(['check/' + this.orderGroup.id + '/order/' + i]).then(() => {
      window.location.reload();
    });
  }

  getOrders(page: number, pageSize: number) {
    this.userService.getUserOrders(page, pageSize).subscribe({
      next: data => {
        this.userService.getUserTokens().subscribe((result) => {
          this.storageService.saveTokens(result);
          console.log(data);
          this.orderGroups = data.content;
          this.count = data.totalItems;
          this.groupid = this.route.snapshot.paramMap.get("groupid");
          this.id = this.route.snapshot.paramMap.get("id");
          let orderGroup = null;
          if (this.groupid == 0) {
            orderGroup = this.orderGroups[0];
          } else {
            orderGroup = this.orderGroups.find(x => x.id == this.groupid);
          }
          if (orderGroup) {
            this.orderGroup = orderGroup;
            this.getOrderGroupTokens();
            if (this.groupid == 0 && this.id == 0 && this.getShirtOrdersIndexes().length > 0) {
              this.changeOrder(orderGroup.orders[this.getShirtOrdersIndexes()[0]]);
            } else if (this.getShirtOrdersIndexes().includes(parseInt(this.id)) && this.getShirtOrdersIndexes().length > 0) {
              this.changeOrder(orderGroup.orders[this.id]);
            } else {
              this.changeOrder(orderGroup.orders[0]);
            }
          } else {
            this.isLoaded = true;
          }
          
        })

        
      },
      error: err => {
        //this.errorMessage = err.error.message;
      }
    })
  }

  handlePageChange(event: number): void {
    this.page = event;
  }

  openDialog(mysterieShirt: MysterieShirt, groepId: number): void {
    const dialogRef = this.dialog.open(Window2Component, {
      width: 'max-content',
      height: 'max-content',
      data: { p: mysterieShirt, o: groepId, g: this.id }
    });
    console.log("dialog is opened");
    console.log(this.order.number);
    console.log(this.pickedShirts);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

  checkOrder() {
    return !(this.order && (Object.keys(this.order).length === 0))
  }

  changeOrderGroup(orderGroup: OrderGroup) {
    this.router.navigate(['check/' + orderGroup.id + '/order/0']).then(() => {
      window.location.reload();
    });
  }

  calculateRemainingTime() {
        let startDate = new Date(this.orderGroup.startDate);
        let endDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate() + 2
        ); // De volgende dag om middernacht
        if (new Date() > endDate) {
          let endDate = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() + 1
        ); // De volgende dag om middernacht
        }
        let diff = endDate.getTime() - new Date().getTime(); // Verschil in milliseconden
        this.days = Math.floor(diff / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        this.minutes = Math.floor((diff / (1000 * 60)) % 60);
        this.seconds = Math.floor((diff / (1000)) % 60);
    }

  changeOrder(order: Order) {
    console.log(order)
    this.order = order;
    if (this.order == undefined) {
      this.isLoaded = true;
    }
    if (order.productEnum != 'TOKEN') {
      this.orderService.getShirts(order.id).subscribe((result) => {
        this.pickedShirts = result;
        this.isLoaded = true;
        console.log(this.pickedShirts)
        for (let ps of this.pickedShirts) {
          console.log("beforeChangedShirt " + ps.beforeChangeShirts[0].clubName)
          this.beforeChangeShirts = this.beforeChangeShirts.concat(ps.beforeChangeShirts);
          console.log("changed shirts " + this.beforeChangeShirts)
        }
      })
    } else {
      this.isLoaded = true;
    }
  }

  showShirt(mysterieShirt: MysterieShirt, groepId: number) {
    const dialogRef = this.dialog.open(Window3Component, {
      width: 'max-content',
      height: 'max-content',
      data: { ms: mysterieShirt, g: groepId, s: "show", order: this.order,o: this.id }
    });
    console.log("dialog is opened");

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  geefError(message: string){
    const dialogRef = this.dialog.open(WindowerrorComponent, {
      width: '',
      data: { s: message }
    });
  }

  changeShirt(mysterieShirt: MysterieShirt, groepId: number) {
    const dialogRef = this.dialog.open(Window3Component, {
      width: '',
      data: { ms: mysterieShirt, g: groepId, s: "change", sId: -1, order: this.order, o: this.id }
    });
    console.log("dialog is opened");

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}