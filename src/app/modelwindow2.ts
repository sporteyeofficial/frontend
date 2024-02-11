import { Component, ElementRef, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ShoppingcartService } from "./_services/shoppingcart.service";
import { Shirt } from "./model/shirt";
import { OrderService } from "./_services/order.service";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { MysterieShirt } from "./model/mysterieShirt";
import { Window3Component } from "./modelwindow3";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";

@Component({
    selector: 'model-window2',
    templateUrl: '../assets/modals/model-window2.html',
    styleUrls: ["../assets/vendor/css/bundle.min.css","../assets/vendor/css/jquery.fancybox.min.css","../assets/vendor/css/cubeportfolio.min.css",
  "../assets/vendor/css/owl.carousel.min.css","../assets/vendor/css/wow.css","../assets/vendor/css/LineIcons.min.css",'../styles.css',"../assets/vendor/css/swiper.min.css"],
  animations: [
    trigger('fadeIn', [
      state('in', style({ opacity: 1 }), {params: {time: 0}}),
      transition('void => *', [
        style({ opacity: -3 }),
        animate('{{time}}')
      ]),
      transition('* => void', [
        animate('{{time}}', style({ opacity: 1 }))
      ])
    ])
  ]
  
  })
  export class Window2Component {
    public shirts: Shirt[] = [];
    public mysterieShirt: any = MysterieShirt;
    sound = new Audio('assets/fifa21packopeningsoundtrimmed.mp3');
    public groupId: number;
    public id: number;

    
    constructor(public dialogRef: MatDialogRef<Window2Component>,
      @Inject(MAT_DIALOG_DATA) public data: {p: MysterieShirt, o: number, g:number}, private router: Router, private dialog: MatDialog,private orderService: OrderService, public elem: ElementRef) {
        this.shirts = data.p.possibleShirts;
        this.mysterieShirt = data.p;
        this.sound.load();
        this.sound.play();
        this.groupId = data.o;
        this.id = data.g;
    }

    onNoClick(): void {
      console.log(this.elem.nativeElement.querySelectorAll('#animation').length)
      this.sound.pause();
      this.dialogRef.close();
    }

    pickShirt(pickedShirtId: number) {
      console.log(this.mysterieShirt.id)
      this.orderService.pickShirt(pickedShirtId, this.mysterieShirt.id).subscribe((result) => {
        console.log(result);
        this.onNoClick();
        this.router.navigateByUrl('check/' +this.groupId +'/order/'+this.id+'?message=Shirt succesvol gekozen').then(() => {
          window.location.reload();
        });
      });
      
    }

    changeShirt(shirtId: number, groepId: number) {
      const dialogRef = this.dialog.open(Window3Component, {
        width: '',
        data: { p: this.mysterieShirt.id, g: groepId, s: "change", sId: shirtId,o: this.id }
      });
      console.log("dialog is opened");
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }

    

  }