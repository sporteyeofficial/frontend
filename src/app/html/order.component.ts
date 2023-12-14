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
  pageSize = 3;
  docBreedte = window.innerWidth
  docHoogte = window.innerHeight

  constructor(private route: ActivatedRoute, private userService: UserServiceService, private dialog: MatDialog, private orderService: OrderService, private storageService: StorageService, private router: Router) {

  }

  ngOnInit(): void {
    this.getOrders(1, this.pageSize);
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

  getShirtOrdersIndexes() : number[] {
    let shirtIndexes: number[] = [];
    for (let i in this.orderGroup.orders) {
      if (this.orderGroup.orders[i].productEnum != 'TOKEN') {
        shirtIndexes.push(parseInt(i));
      }
    }
    return shirtIndexes;
  }

  changeOrderOfGroup(i: number) {
    this.router.navigate(['check/'+this.orderGroup.id+'/order/' + i]).then(() => {
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
          let orderGroup = null
          if (this.groupid == 0) {
             orderGroup = this.orderGroups[0]
          }else {
             orderGroup = this.orderGroups.find(x => x.id == this.groupid);
          }
          if (orderGroup) {
            this.orderGroup = orderGroup;
            if (this.groupid == 0 && this.id == 0) {
              this.changeOrder(orderGroup.orders[this.getShirtOrdersIndexes()[0]])
            } else {
              this.getOrderGroupTokens();
            if (this.getShirtOrdersIndexes().includes(parseInt(this.id))) {
              this.changeOrder(orderGroup.orders[this.id]);
            }
            }
            
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
    this.getOrders(this.page, this.pageSize);
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
    this.router.navigate(['check/'+orderGroup.id+'/order/0']).then(() => {
      window.location.reload();
    });
  }

  changeOrder(order: Order) {
    this.orderService.getShirts(order.id).subscribe((result) => {
      this.order = order;
      this.pickedShirts = result;
      console.log(this.pickedShirts)
      for (let ps of this.pickedShirts) {
        console.log("beforeChangedShirt " + ps.beforeChangeShirts[0].clubName)
        this.beforeChangeShirts = this.beforeChangeShirts.concat(ps.beforeChangeShirts);
        console.log("changed shirts " + this.beforeChangeShirts)
      }
    })
  }

  showShirt(mysterieShirtId: number, groepId: number) {
    const dialogRef = this.dialog.open(Window3Component, {
      width: 'max-content',
      height: 'max-content',
      data: { p: mysterieShirtId, g: groepId, s: "show", o:this.id }
    });
    console.log("dialog is opened");

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  changeShirt(mysterieShirtId: number, groepId: number) {
    const dialogRef = this.dialog.open(Window3Component, {
      width: '',
      data: { p: mysterieShirtId, g: groepId, s: "change", o:this.id }
    });
    console.log("dialog is opened");

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}