import { Component, ElementRef, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MysterieShirt } from "./model/mysterieShirt";
import { Order } from "./model/order";
import { ShoppingcartService } from "./_services/shoppingcart.service";
import { OrderService } from "./_services/order.service";
import { Router } from "@angular/router";
import { StorageService } from "./_services/storage.service";
import { UserServiceService } from "./_services/user-service.service";
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'model-window3',
    templateUrl: '../assets/modals/model-window3.html',
    styleUrls: ["../assets/vendor/css/bundle.min.css","../assets/vendor/css/jquery.fancybox.min.css","../assets/vendor/css/cubeportfolio.min.css",
  "../assets/vendor/css/owl.carousel.min.css","../assets/vendor/css/wow.css","../assets/vendor/css/LineIcons.min.css",'../styles.css',"../assets/vendor/css/swiper.min.css"],
  
  })
  export class Window3Component {
    public mysterieShirt: MysterieShirt;
    public groepId: number;
    public soort: string;
    public id: number;
    public order: Order;
    public shirtId: number;
    constructor(public dialogRef: MatDialogRef<Window3Component>, private toastr: ToastrService,
      @Inject(MAT_DIALOG_DATA) public data: {ms: MysterieShirt, g: number, s: string, sId: number, order:Order, o:number}, private storageService: StorageService, private userService: UserServiceService, private orderService: OrderService, public elem: ElementRef, public router: Router) {
        this.mysterieShirt = data.ms;
        this.groepId = data.g;
        this.soort = data.s;
        this.id = data.o;
        this.order = data.order;
        this.shirtId = data.sId;
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    confirmBox() {
      if (this.soort == "change") {
        this.changeShirt();
      }else {
        this.showShirt();
      }
    }

    pickAgain() {
      this.orderService.unpickShirt(this.mysterieShirt.id).subscribe((result) => {
        window.location.reload();
      });
    }

    showShirt() {
      this.orderService.showShirt(this.mysterieShirt.id).subscribe((result) => {
        this.userService.getUserTokens().subscribe((result) => {
          this.storageService.saveTokens(result);
        this.router.navigateByUrl('check/' +this.groepId +'/order/'+this.id+'?message=Shirt is met succes zichtbaar geworden').then(() => {
          window.location.reload();
          
        });
      })
      })
    }
  
    changeShirt() {
      this.orderService.changeShirt(this.mysterieShirt.id, this.shirtId).subscribe((result) => {
        this.userService.getUserTokens().subscribe((result) => {
          this.storageService.saveTokens(result);
          console.log(this.shirtId);
        this.router.navigateByUrl('check/' + this.groepId + '/order/'+this.id+'?message=Shirt succesvol gewijzigd').then(() => {
          window.location.reload();
          
        });
        
      },
      (error) => {
        this.toastr.error(error.error.message);
      })
      },
      (error) => {
        this.toastr.error(error.error.message);
      })
    }
  }