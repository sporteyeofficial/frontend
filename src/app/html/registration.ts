import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from '../_helpers/customvalidator';
import { UserServiceService } from '../_services/user-service.service';
import { StorageService } from '../_services/storage.service';



@Component({
    selector: 'register',
    templateUrl: '../html/registration.html',
    styleUrls: ["../../assets/vendor/css/bundle.min.css","../../assets/vendor/css/LineIcons.min.css","../../assets/vendor/css/cubeportfolio.min.css","../../assets/vendor/css/jquery.fancybox.min.css",
    "../../assets/vendor/css/owl.carousel.min.css","../../assets/vendor/css/swiper.min.css","../../assets/vendor/css/wow.css","../../assets/vendor/css/LineIcons.min.css","../../assets/vendor/css/bundle.min.css",
    "../../assets/vendor/css/cubeportfolio.min.css",'../../styles.css',"../../assets/vendor/css/jquery.fancybox.min.css","../../assets/vendor/css/owl.carousel.min.css","../../assets/vendor/css/swiper.min.css","../../assets/vendor/css/wow.css"],
  })
  export class RegisterComponent {
        form: FormGroup = new FormGroup({
            name:new FormControl(null,[Validators.required]),
            surname:new FormControl(null,[Validators.required]),
            street:new FormControl(null,[Validators.required]),
            extra:new FormControl(null,[]),
            houseNumber:new FormControl(null,[Validators.required]),
            postalCode:new FormControl(null,[Validators.required]),
            country:new FormControl(null,[Validators.required]),
            city:new FormControl(null,[Validators.required]),
            email: new FormControl(null,[Validators.required,Validators.email]),
            password:new FormControl(null,[Validators.required]),
            passwordConfirm:new FormControl(null,[Validators.required]),
            acceptTerms: new FormControl(false, Validators.requiredTrue),
            //birthdate: new FormControl(null,[Validators.required])
        },
        { validators: CustomValidators.passwordsMatching }
    );

    isSuccessful = false;
    isSignUpFailed = false;
    errorMessage = '';

  constructor(private router: Router, private userService: UserServiceService, private storageService: StorageService) { }

  register() {
    if (this.form.valid) {
      this.userService.create({
        email: this.form.get('email')?.value,
        password:​this.form.get('password')?.value,
        name: this.form.get('name')?.value,
        surname: this.form.get('surname')?.value,
        birthdate: new Date(),
        country: this.form.get('country')?.value,
        postalCode: this.form.get('postalCode')?.value,
        city: this.form.get('city')?.value, 
        street: this.form.get('street')?.value, 
        houseNr: this.form.get('houseNumber')?.value, 
        streetDescr: this.form.get('extra')?.value,
        money: 0,
        points: 0,
        id: 0, roles: [],clubs: [],changeTokens: 0, cheatTokens: 0
      }).subscribe(
        {
          next: data => {
            console.log(data);
            this.storageService.saveUser(data);
            this.isSuccessful = true;
            this.isSignUpFailed = false;
            this.router.navigate(['home']).then(() => {
              window.location.reload();
            });
          },
          error: err => {
            this.errorMessage = err.error.message;
            this.isSignUpFailed = true;
          }
      });
    }
  }

    get email(): FormControl {
        return this.form.get('email') as FormControl;
    }

    get name(): FormControl {
        return this.form.get('name') as FormControl;
    }

    get acceptTerms(): FormControl {
        return this.form.get('acceptTerms') as FormControl;
    }

    get surname(): FormControl {
        return this.form.get('surname') as FormControl;
    }

    get country(): FormControl {
      return this.form.get('country') as FormControl;
    }

    get street(): FormControl {
      return this.form.get('street') as FormControl;
    }

    get houseNr(): FormControl {
      return this.form.get('houseNumber') as FormControl;
    }

    get city(): FormControl {
      return this.form.get('city') as FormControl;
    }

    get postalCode(): FormControl {
      return this.form.get('postalCode') as FormControl;
    }

    get extra(): FormControl {
      return this.form.get('extra') as FormControl;
    }

    get password(): FormControl {
        return this.form.get('password') as FormControl;
    }

    get passwordConfirm(): FormControl {
        return this.form.get('passwordConfirm') as FormControl;
    }
    
  }

  @NgModule({
    imports: [
     ReactiveFormsModule,
     CommonModule
    ],
    declarations: [
      RegisterComponent,
    ],
    providers: []
  })
  
  export class AuthorModule {}