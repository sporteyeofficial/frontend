import { Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ekvoorspellingService } from "./_services/ekvoorspelling.service";
import { ToastrService } from 'ngx-toastr';
import { StorageService } from "./_services/storage.service";
import {
	RegExpMatcher,
	TextCensor,
	englishDataset,
	englishRecommendedTransformers,
} from 'obscenity';
import words from "naughty-words";

@Component({
    selector: 'betusernamewindow',
    templateUrl: '../assets/modals/betusername-modal.html',
    styleUrls: ["../assets/vendor/css/bundle.min.css","../assets/vendor/css/jquery.fancybox.min.css","../assets/vendor/css/cubeportfolio.min.css",
  "../assets/vendor/css/owl.carousel.min.css","../assets/vendor/css/wow.css","../assets/vendor/css/LineIcons.min.css",'../styles.css',"../assets/vendor/css/swiper.min.css"],
  
  })
  export class WindowBetusernameComponent {
    betusername = "";
    user!: any;
    filter = new RegExpMatcher({...englishDataset.build(),...englishRecommendedTransformers});
    constructor(public dialogRef: MatDialogRef<WindowBetusernameComponent>, private ekvoorspellingService: ekvoorspellingService, private toastr: ToastrService, private storageService: StorageService,
      @Inject(MAT_DIALOG_DATA) public data: {u: any}) {
        this.user = data.u;
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    badWord() {
        let un = this.betusername.toLowerCase();
        for (let word of words.nl) {
            if (un.includes(word)) {
                return true;
            }
        } 
        return false;
    }

    changeBetUsername() {
        if (!this.filter.hasMatch(this.betusername) && !this.badWord()) {
            this.ekvoorspellingService.changeBetUsername(this.betusername).subscribe({
                next: data => {
                    this.user.betUsername = this.betusername;
                    this.storageService.saveUser(this.user);
                    window.location.reload();
                    this.toastr.success(data);
                },
                error: err => {
                    console.log(err)
                    this.toastr.error("Deelname niet geslaagd!")
                }
            });
        } else {
            this.toastr.error("Usernaam niet toegelaten!")
        }
    }



}