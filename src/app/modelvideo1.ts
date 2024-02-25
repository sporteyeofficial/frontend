import { Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'model-video1',
    templateUrl: '../assets/modals/video-modal.html',
    styleUrls: ["../assets/vendor/css/bundle.min.css",'../styles.css',"../assets/vendor/css/jquery.fancybox.min.css","../assets/vendor/css/cubeportfolio.min.css",
  "../assets/vendor/css/owl.carousel.min.css","../assets/vendor/css/wow.css","../assets/vendor/css/LineIcons.min.css","../assets/vendor/css/swiper.min.css"],
}) export class WindowVideoComponent {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
    constructor(public dialogRef: MatDialogRef<WindowVideoComponent>,
      @Inject(MAT_DIALOG_DATA) public data: {u: "url"}) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

    ngAfterViewInit() {
        this.videoPlayer.nativeElement.addEventListener('ended', this.onVideoEnd.bind(this));
    }

    onVideoEnd() {
        // Code to close the modal
        this.dialogRef.close();
    }
}

