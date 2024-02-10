import { Component, ElementRef, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MysterieShirt } from "./model/mysterieShirt";
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
    public mysterieShirtId: number;
    public groepId: number;
    public soort: string;
    public id: number;
    public shirtId: number;
    constructor(public dialogRef: MatDialogRef<Window3Component>, private toastr: ToastrService,
      @Inject(MAT_DIALOG_DATA) public data: {p: number, g: number, s: string, sId: number, o:number}, private storageService: StorageService, private userService: UserServiceService, private orderService: OrderService, public elem: ElementRef, public router: Router) {
        this.mysterieShirtId = data.p;
        this.groepId = data.g;
        this.soort = data.s;
        this.id = data.o;
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

    showShirt() {
      this.orderService.showShirt(this.mysterieShirtId).subscribe((result) => {
        this.userService.getUserTokens().subscribe((result) => {
          this.storageService.saveTokens(result);
        this.router.navigate(['check/' +this.groepId +'/order/'+this.id]).then(() => {
          window.location.reload();
          
        });
        this.toastr.success('Shirt is zichtbaar.');
      })
      })
    }
  
    changeShirt() {
      this.orderService.changeShirt(this.mysterieShirtId, this.shirtId).subscribe((result) => {
        this.userService.getUserTokens().subscribe((result) => {
          this.storageService.saveTokens(result);
          console.log(this.shirtId);
        this.router.navigate(['check/' + this.groepId + '/order/'+this.id]).then(() => {
          window.location.reload();
          
        });
        this.toastr.success('Shirt is veranderd');
      })
      })
    }
  }