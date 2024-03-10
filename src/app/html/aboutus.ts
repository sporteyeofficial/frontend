import { Component } from "@angular/core";
import { WijzigProfielComponent } from "../wijzigProfielModal";
import { MatDialog } from "@angular/material/dialog";
import { StorageService } from "../_services/storage.service";
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'about-us',
    templateUrl: '../html/about-us.html',
    styleUrls: ["../../assets/vendor/css/bundle.min.css","../../assets/vendor/css/LineIcons.min.css","../../assets/vendor/css/cubeportfolio.min.css","../../assets/vendor/css/jquery.fancybox.min.css",
    "../../assets/vendor/css/owl.carousel.min.css","../../assets/vendor/css/swiper.min.css","../../assets/vendor/css/wow.css","../../assets/vendor/css/LineIcons.min.css","../../assets/vendor/css/bundle.min.css",
    "../../assets/vendor/css/cubeportfolio.min.css",'../../styles.css',"../../assets/vendor/css/jquery.fancybox.min.css","../../assets/vendor/css/owl.carousel.min.css","../../assets/vendor/css/swiper.min.css","../../assets/vendor/css/wow.css"],
    
  
  })
  export class AboutUsComponent {
    constructor(private dialog: MatDialog, private storageService: StorageService, private toastr: ToastrService) {}
    
    wijzigProfiel() {
      if (this.storageService.getUser() != null) {
        const dialogRef = this.dialog.open(WijzigProfielComponent, {
        panelClass: 'dialogclass',
        height: 'max-content',
        data: {}
      });
      console.log("dialog is opened");

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
      } else {
        this.toastr.error("Meld u aan om ploegen te kunnen kiezen!");
      }
      
  }

  }