import { Component, NgModule } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import * as CryptoJS from 'crypto-js';
import { UserServiceService } from "../_services/user-service.service";
import { StorageService } from "../_services/storage.service";
import { MatDialog } from "@angular/material/dialog";
import { VeranderWachtwoordComponent } from "../veranderWachtwoordModal";


@Component({
    selector: 'login',
    templateUrl: '../html/login.html',
    styleUrls: ["../../assets/vendor/css/bundle.min.css","../../assets/vendor/css/LineIcons.min.css","../../assets/vendor/css/cubeportfolio.min.css","../../assets/vendor/css/jquery.fancybox.min.css",
    "../../assets/vendor/css/owl.carousel.min.css","../../assets/vendor/css/swiper.min.css","../../assets/vendor/css/wow.css","../../assets/vendor/css/LineIcons.min.css","../../assets/vendor/css/bundle.min.css",
    "../../assets/vendor/css/cubeportfolio.min.css",'../../styles.css',"../../assets/vendor/css/jquery.fancybox.min.css","../../assets/vendor/css/owl.carousel.min.css","../../assets/vendor/css/swiper.min.css","../../assets/vendor/css/wow.css"],
  })
  export class LoginComponent {
    form: FormGroup = new FormGroup({
      email: new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required]),
  });
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  message = '';
  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

    constructor(private router: Router, private userService: UserServiceService, private activatedRoute: ActivatedRoute, private storageService: StorageService, private dialog: MatDialog,) {
      this.activatedRoute.queryParams.subscribe(params => {
        if (params['message'] != null)
          this.message = params['message']; // Print the parameter to the console. 
      });
    }
    
    login() {
        this.userService.login(
          {email: this.form.get('email')?.value,
          password: ​this.form.get('password')?.value}
          
        ).subscribe({
          next: data => {
            this.storageService.saveUser(data);
    
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.roles = this.storageService.getUser().roles;
            this.router.navigate(['']).then(() => {
              window.location.reload();
            });
          },
          error: err => {
            this.errorMessage = err.error.message;
            this.isLoginFailed = true;
          }
            // Gebruikersregistratie succesvol, voer hier gewenste logica uit
            
      });
    
      }

      modalWachtwoordWijzigen() {
        const dialogRef = this.dialog.open(VeranderWachtwoordComponent, {
          width: '',
          data: {}
        });
        console.log("dialog is opened");
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      }

      get email(): FormControl {
        return this.form.get('email') as FormControl;
      }

      get password(): FormControl {
        return this.form.get('password') as FormControl;
      }
  }

  @NgModule({
    imports: [
     ReactiveFormsModule,
     CommonModule
    ],
    declarations: [
      LoginComponent,
    ],
    providers: []
  })
  
  export class AuthorModule {}

