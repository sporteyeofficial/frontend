import { Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Product } from "./model/product";
import { SizeEnum } from "./model/Enum/SizeEnum";
import { ShoppingcartService } from "./_services/shoppingcart.service";
import { FormArray, FormControl } from "@angular/forms";
import { ProductService } from "./_services/product.service";
import { ProductEnum } from "./model/Enum/ProductEnum";
import { WijzigProfielComponent } from "./wijzigProfielModal";
import { MatDialog } from "@angular/material/dialog";


@Component({
    selector: 'model-window1',
    templateUrl: '../assets/modals/model-window1.html',
    styleUrls: ["../assets/vendor/css/bundle.min.css",'../styles.css',"../assets/vendor/css/jquery.fancybox.min.css","../assets/vendor/css/cubeportfolio.min.css",
  "../assets/vendor/css/owl.carousel.min.css","../assets/vendor/css/wow.css","../assets/vendor/css/LineIcons.min.css","../assets/vendor/css/swiper.min.css"],
})
  export class Window1Component {
    product: Product;
    products: Product[] = [];
    sizeEnum = SizeEnum;
    productEnum = ProductEnum;
    enumKeys: any[];
    size = "_L";
    selected=false
    numbers = new FormArray([
      new FormControl(1),
      new FormControl(0),
      new FormControl(0)
    ]);
    docBreedte = window.innerWidth
    docHoogte = window.innerHeight
    constructor(public dialogRef: MatDialogRef<Window1Component>,
      @Inject(MAT_DIALOG_DATA) public data: {p: Product, products: Product[]}, private dialog: MatDialog, private shoppingCartService: ShoppingcartService, private productService: ProductService) {
        this.product = data.p;
        this.products = data.products;
        this.enumKeys=Object.keys(this.sizeEnum);
        this.productService.getSizes(this.product.id).subscribe((result) => {
          this.enumKeys=result;
          this.enumKeys.sort();
        })
    }

    addProductToShoppingCart(product: Product) {
        this.shoppingCartService.addProductToShoppingcart(product, this.numbers.at(0).value, this.size);
        let changeToken = this.numbers.at(1).value
        let cheatToken = this.numbers.at(2).value
        if (changeToken) {
          this.shoppingCartService.addProductToShoppingcart(this.products[2], changeToken, this.size);
        }
        if (cheatToken) {
          this.shoppingCartService.addProductToShoppingcart(this.products[3], cheatToken, this.size);
        }
    }

    wijzigProfiel() {
      const dialogRef = this.dialog.open(WijzigProfielComponent, {
        panelClass: 'dialogclass',
        height: 'max-content',
        data: {}
      });
      console.log("dialog is opened");

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
  }

    onNoClick(): void {
      this.dialogRef.close();
    }

    onSelected(value:string): void {
      this.selected = true;
      this.size = value;
    }

    increaseNumber(index: number): void {
      let control = this.numbers.at(index) as FormControl;
      control.setValue(control.value + 1);
    }
  
    decreaseNumber(index: number): void {
      let control = this.numbers.at(index) as FormControl;
      if (control.value > 0) {
        control.setValue(control.value - 1);
      }
    }


  
}