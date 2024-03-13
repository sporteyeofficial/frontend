import { Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Product } from './model/product';

@Component({
    selector: 'infowindow',
    templateUrl: '../assets/modals/model-info.html',
    styleUrls: ["../assets/vendor/css/bundle.min.css","../assets/vendor/css/jquery.fancybox.min.css","../assets/vendor/css/cubeportfolio.min.css",
  "../assets/vendor/css/owl.carousel.min.css","../assets/vendor/css/wow.css","../assets/vendor/css/LineIcons.min.css",'../styles.css',"../assets/vendor/css/swiper.min.css"],
  
  })
  export class WindowInfoComponent {
    public product: Product;
    constructor(public dialogRef: MatDialogRef<WindowInfoComponent>,
      @Inject(MAT_DIALOG_DATA) public data: {p: Product}) {
        this.product = data.p;
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

}