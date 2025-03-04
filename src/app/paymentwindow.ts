import { Component, ElementRef, Inject, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MysterieShirt } from "./model/mysterieShirt";
import { Order } from "./model/order";
import { ShoppingcartService } from "./_services/shoppingcart.service";
import { OrderService } from "./_services/order.service";
import { Router } from "@angular/router";
import { StorageService } from "./_services/storage.service";
import { UserServiceService } from "./_services/user-service.service";
import { ToastrService } from 'ngx-toastr';
import AdyenCheckout from '@adyen/adyen-web';

@Component({
    selector: 'payment-window',
    templateUrl: '../assets/modals/payment-window.html',
    styleUrls: ['../../node_modules/@adyen/adyen-web/dist/adyen.css', "../assets/vendor/css/bundle.min.css","../assets/vendor/css/jquery.fancybox.min.css","../assets/vendor/css/cubeportfolio.min.css",
  "../assets/vendor/css/owl.carousel.min.css","../assets/vendor/css/wow.css","../assets/vendor/css/LineIcons.min.css",'../styles.css',"../assets/vendor/css/swiper.min.css"],
  
  })
  export class PaymentWindowComponent {
      private checkout: any;
      private dropinComponent: any;
      configuration = {}
      constructor(private toastr: ToastrService,
      @Inject(MAT_DIALOG_DATA) public data: {session: any, amount: any}, private storageService: StorageService, private userService: UserServiceService, private orderService: OrderService, public elem: ElementRef, public router: Router) {
        this.configuration = {
          environment: 'test', // Change to 'live' for the live environment.
          clientKey: 'test_HWNB4L4XO5F4BNFH4DYUEVT3QAHMTSOY', // Public key used for client-side authentication
          locale: "nl_BE",
          showPayButton: true,
          analytics: {
            enabled: true // Set to false to not send analytics data to Adyen.
          },
          session: data.session,
          onPaymentCompleted: (result: any, component: any) => {
              console.info(result, component);
              this.router.navigateByUrl('check/' + 0 +'/order/' + 0 +'?message=Betaling was succesvol!').then(() => {
                window.location.reload();
              });
          },
          onError: (error: any, component: any) => {
              console.error(error.name, error.message, error.stack, component);
          },
          // Payment method specific configuration
          paymentMethodsConfiguration: {
            card: {
              hasHolderName: true,
              holderNameRequired: true,
              billingAddressRequired: true,
              amount: {
                  value: data.amount,
                  currency: "EUR"
              }
            }
          }
        };
    }

    async ngOnInit() {
      	// Create an instance of AdyenCheckout using the configuration object.
      const checkout = await AdyenCheckout(this.configuration);
      
      
      
      // Create an instance of Drop-in and mount it to the container you created.
      const dropinComponent = checkout.create('dropin').mount('#dropin-container');
    }

    ngOnDestroy() {
      if (this.dropinComponent) {
        this.dropinComponent.unmount();
      }
    }
  }