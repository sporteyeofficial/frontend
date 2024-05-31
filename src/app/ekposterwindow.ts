import { Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ekvoorspellingService } from "./_services/ekvoorspelling.service";
import { ToastrService } from 'ngx-toastr';
import { StorageService } from "./_services/storage.service";

@Component({
    selector: 'ekposterwindow',
    templateUrl: '../assets/modals/ekposter-modal.html',
    styleUrls: ["../assets/vendor/css/bundle.min.css","../assets/vendor/css/jquery.fancybox.min.css","../assets/vendor/css/cubeportfolio.min.css",
  "../assets/vendor/css/owl.carousel.min.css","../assets/vendor/css/wow.css","../assets/vendor/css/LineIcons.min.css",'../styles.css',"../assets/vendor/css/swiper.min.css"],
  
  })
  export class WindowEKPosterComponent {
    constructor(public dialogRef: MatDialogRef<WindowEKPosterComponent>, private ekvoorspellingService: ekvoorspellingService, private toastr: ToastrService, private storageService: StorageService,
      @Inject(MAT_DIALOG_DATA) public data: {}) {
        
    }

    onNoClick(): void {
      this.dialogRef.close();
    }


}