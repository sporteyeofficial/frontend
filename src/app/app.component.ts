import { Component, OnInit, OnDestroy } from '@angular/core';
import { Shirt } from './model/shirt';
import { User } from './model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './_services/product.service';
import { Product } from './model/product';
import { ShoppingcartService } from './_services/shoppingcart.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Window1Component } from './modelwindow1';
import { WindowVideoComponent } from './modelvideo1';
import { WindowInfoComponent } from './modelinfo';
import { StorageService } from './_services/storage.service';
import { NgcCookieConsentService, NgcInitializingEvent, NgcInitializationErrorEvent, NgcStatusChangeEvent, NgcNoCookieLawEvent} from 'ngx-cookieconsent';
import { Subscription }   from 'rxjs';



@Component({
  selector: 'home',
  templateUrl: 'app.component.html',
  styleUrls: ["../assets/vendor/css/bundle.min.css", "../assets/vendor/css/jquery.fancybox.min.css", "../assets/vendor/css/cubeportfolio.min.css",
    "../assets/vendor/css/wow.css", "../assets/vendor/css/LineIcons.min.css", '../styles.css', "../assets/vendor/css/swiper.min.css", "../assets/vendor/css/owl.carousel.min.css"],


})
export class HomeComponent implements OnInit, OnDestroy {
  title = 'sportEye';
  products: Product[] = [];
  errorMessage = '';
  message = '';
  currentUser: any;
  //keep refs to subscriptions to be able to unsubscribe later
  private popupOpenSubscription!: Subscription;
  private popupCloseSubscription!: Subscription;
  private initializingSubscription!: Subscription;
  private initializedSubscription!: Subscription;
  private initializationErrorSubscription!: Subscription;
  private statusChangeSubscription!: Subscription;
  private revokeChoiceSubscription!: Subscription;
  private noCookieLawSubscription!: Subscription;

  constructor(private router: Router, private productService: ProductService, private storageService: StorageService, private dialog: MatDialog, private ccService: NgcCookieConsentService) {
    this.currentUser = this.storageService.getUser();
  }

  ngOnInit() {
    this.getProducts();
    // subscribe to cookieconsent observables to react to main events
    // subscribe to cookieconsent observables to react to main events
    this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.popupCloseSubscription = this.ccService.popupClose$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.initializingSubscription = this.ccService.initializing$.subscribe(
      (event: NgcInitializingEvent) => {
        // the cookieconsent is initilializing... Not yet safe to call methods like `NgcCookieConsentService.hasAnswered()`
        console.log(`initializing: ${JSON.stringify(event)}`);
      });
    
    this.initializedSubscription = this.ccService.initialized$.subscribe(
      () => {
        // the cookieconsent has been successfully initialized.
        // It's now safe to use methods on NgcCookieConsentService that require it, like `hasAnswered()` for eg...
        console.log(`initialized: ${JSON.stringify(event)}`);
      });

    this.initializationErrorSubscription = this.ccService.initializationError$.subscribe(
      (event: NgcInitializationErrorEvent) => {
        // the cookieconsent has failed to initialize... 
        console.log(`initializationError: ${JSON.stringify(event.error?.message)}`);
      });

    this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

      this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe(
      (event: NgcNoCookieLawEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });

  }

  ngOnDestroy() {
    // unsubscribe to cookieconsent observables to prevent memory leaks
    this.popupOpenSubscription.unsubscribe();
    this.popupCloseSubscription.unsubscribe();
    this.initializingSubscription.unsubscribe();
    this.initializedSubscription.unsubscribe();
    this.initializationErrorSubscription.unsubscribe();
    this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription.unsubscribe();
    this.noCookieLawSubscription.unsubscribe();
  }

  openInfoModal(product: Product) {
    const dialogRef = this.dialog.open(WindowInfoComponent, {
        width: 'max-content',
        height: 'max-content',
        data: { p: product }
      });
      console.log("dialog is opened");

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
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

  goToEk() {
    this.router.navigate(['ekvoorspelling']).then(() => {
      window.location.reload();
    });
  }

  openVideo() {
      const dialogRef = this.dialog.open(WindowVideoComponent, {
        panelClass: 'dialogclass',
        height: 'max-content',
        width: 'max-content',
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
                this.products.sort((a: Product, b: Product) => b.price - a.price);
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
