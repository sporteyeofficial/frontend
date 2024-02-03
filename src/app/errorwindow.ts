import { Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
@Component({
    selector: 'errorwindow',
    templateUrl: '../assets/modals/error-window.html',
    styleUrls: ["../assets/vendor/css/bundle.min.css","../assets/vendor/css/jquery.fancybox.min.css","../assets/vendor/css/cubeportfolio.min.css",
  "../assets/vendor/css/owl.carousel.min.css","../assets/vendor/css/wow.css","../assets/vendor/css/LineIcons.min.css",'../styles.css',"../assets/vendor/css/swiper.min.css"],
  
  })
  export class WindowerrorComponent {
    public message: string;
    constructor(public dialogRef: MatDialogRef<WindowerrorComponent>,
      @Inject(MAT_DIALOG_DATA) public data: {s: string}) {
        this.message = data.s;
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

}

