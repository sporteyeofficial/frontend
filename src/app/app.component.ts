import { Component } from '@angular/core';
import { Shirt } from './model/shirt';
import { User } from './model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './_services/product.service';
import { Product } from './model/product';
import { ShoppingcartService } from './_services/shoppingcart.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Window1Component } from './modelwindow1';
import { WindowVideoComponent } from './modelvideo1';
import { StorageService } from './_services/storage.service';



@Component({
  selector: 'home',
  templateUrl: 'app.component.html',
  styleUrls: ["../assets/vendor/css/bundle.min.css", "../assets/vendor/css/jquery.fancybox.min.css", "../assets/vendor/css/cubeportfolio.min.css",
    "../assets/vendor/css/wow.css", "../assets/vendor/css/LineIcons.min.css", '../styles.css', "../assets/vendor/css/swiper.min.css", "../assets/vendor/css/owl.carousel.min.css"],


})
export class HomeComponent {
  title = 'sportEye';
  products: Product[] = [];
  errorMessage = '';
  message = '';
  currentUser: any;

  constructor(private router: Router, private productService: ProductService, private storageService: StorageService, private dialog: MatDialog) {
    this.currentUser = this.storageService.getUser();
  }

  ngOnInit(): void {
    this.getProducts();
  }

  goToAboutSection() {
    this.router.navigate(['about']).then(() => {
        const element = document.querySelector('#productinfo');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    });
  }

  openDialog(product: Product): void {
    if (this.currentUser != null) {
      const dialogRef = this.dialog.open(Window1Component, {
        panelClass: 'dialogclass',
        data: { p: product, products: this.products }
      });
      console.log("dialog is opened");

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    } else {
      this.router.navigateByUrl('/login?message=Log in voor een product te kunnen toe te voegen aan uw winkelmand').then(() => {
        window.location.reload();
      });
    }
  }

  openVideo() {
      const dialogRef = this.dialog.open(WindowVideoComponent, {
        panelClass: 'dialogclass',
        height: 'max-content',
        data: {}
      });
      console.log("dialog is opened");

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
  }

  getProducts(): void {
    if (!this.storageService.getProducts()) {
      this.productService.getProducts().subscribe({
        next: data => {
          for (let d in data) {
            
              this.productService.getSizes(data[d].id).subscribe((result) => {
                let product = new Product(data[d].id, data[d].categorie, data[d].name, data[d].price, data[d].description, data[d].imageLoc, data[d].numberOfShirts, data[d].productType, result.sort());
                this.storageService.addProduct(product);
                this.products.push(product);
              })
          } 
        },
        error: err => {
          this.errorMessage = err.error.message;

        }
      });
    } else {
      this.products = this.storageService.getProducts();
      this.products.sort((a: Product, b: Product) => b.price - a.price);
    }
    

  }
}
