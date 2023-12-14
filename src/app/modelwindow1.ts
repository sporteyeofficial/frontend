import { Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Product } from "./model/product";
import { SizeEnum } from "./model/Enum/SizeEnum";
import { ShoppingcartService } from "./_services/shoppingcart.service";
import { FormControl } from "@angular/forms";
import { ProductService } from "./_services/product.service";
import { ProductEnum } from "./model/Enum/ProductEnum";


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
    number = new FormControl(1);
    numberCheatTokens = new FormControl(0);
    numberChangeTokens = new FormControl(0);
    docBreedte = window.innerWidth
    docHoogte = window.innerHeight
    constructor(public dialogRef: MatDialogRef<Window1Component>,
      @Inject(MAT_DIALOG_DATA) public data: {p: Product, products: Product[]}, private shoppingCartService: ShoppingcartService, private productService: ProductService) {
        this.product = data.p;
        this.products = data.products;
        this.enumKeys=Object.keys(this.sizeEnum);
        this.productService.getSizes(this.product.id).subscribe((result) => {
          this.enumKeys=result;
          this.enumKeys.sort();
        })
    }

    addProductToShoppingCart(product: Product) {
        this.shoppingCartService.addProductToShoppingcart(product, (<HTMLInputElement>document.getElementById("instocknumber")).value, this.size);
        let changeToken = parseInt((<HTMLInputElement>document.getElementById("instocknumber"+2)).value)
        let cheatToken = 0
        if (document.getElementById("instocknumber"+3) != null)
          cheatToken = parseInt((<HTMLInputElement>document.getElementById("instocknumber"+3)).value)
        console.log(changeToken)
        console.log(cheatToken)
        if (changeToken > 0) {
          this.shoppingCartService.addProductToShoppingcart(this.products[2], changeToken, this.size);
        }
        if (cheatToken > 0) {
          this.shoppingCartService.addProductToShoppingcart(this.products[3], cheatToken, this.size);
        }
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    onSelected(value:string): void {
      this.selected = true;
      this.size = value;
    }

    min(value: number) {
      if (parseInt((<HTMLInputElement>document.getElementById("instocknumber"+value)).value) > 0) {
        (<HTMLInputElement>document.getElementById("instocknumber"+value)).value = (parseInt((<HTMLInputElement>document.getElementById("instocknumber"+value)).value)-1).toString();
      }
      }

    plus(value: number) {
      (<HTMLInputElement>document.getElementById("instocknumber"+value)).value = (parseInt((<HTMLInputElement>document.getElementById("instocknumber"+value)).value)+1).toString();
    }


  
  }