import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from '../_helpers/customvalidator';
import { UserServiceService } from '../_services/user-service.service';
import { StorageService } from '../_services/storage.service';
import { ToastrService } from 'ngx-toastr';


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
            extra:new FormControl(null,[]),
            adres:new FormControl(null,[]),
            email: new FormControl(null,[Validators.required,Validators.email]),
            password:new FormControl(null,[Validators.required]),
            passwordConfirm:new FormControl(null,[Validators.required]),
            acceptTerms: new FormControl(false, Validators.requiredTrue),
            
            //birthdate: new FormControl(null,[Validators.required])
        },
        { validators: CustomValidators.passwordsMatching }
    );
    street = '';
    houseNumber = '';
    country = '';
    postalCode = '';
    city = '';
    isSuccessful = false;
    isSignUpFailed = false;
    errorMessage = '';
    showDropdown = false;
    adresAdded = false;
    choices: any = [];
  constructor(private toastr: ToastrService, private router: Router, private userService: UserServiceService, private storageService: StorageService) { }

  register() {
    if (this.form.valid) {
      this.userService.create({
        email: this.form.get('email')?.value,
        password:​this.form.get('password')?.value,
        name: this.form.get('name')?.value,
        surname: this.form.get('surname')?.value,
        birthdate: new Date(),
        country: this.country,
        postalCode: this.postalCode,
        city: this.city, 
        street: this.street, 
        houseNr: this.houseNumber, 
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

  closeDropdown() {
    this.showDropdown = false;
  }

  getCity(adres: any) {
    return adres.address.village !== undefined ? adres.address.village 
       : adres.address.town !== undefined ? adres.address.town 
       : adres.address.city;
  }

  toggleDropdown() {
    const data = null;
    this.choices = [];
    const xhr = new XMLHttpRequest();
    //xhr.withCredentials = true;
    let self = this;
    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === this.DONE) {
        let addresses = JSON.parse(this.responseText);
        console.log(addresses);
        for (let a in addresses) {
          let adres = addresses[a];
          if (adres.type == "house" || adres.type == "yes") {
              self.choices.push(adres);
          }
        }
        if (self.choices.length == 0) {
          self.toastr.error("Geen geldig huisadres, geef minstens straat en nummer!");
        }
      }
    });

    xhr.open('GET', 'https://forward-reverse-geocoding.p.rapidapi.com/v1/search?q=' + encodeURIComponent(this.form.get('adres')?.value) + '&format=json&addressdetails=1&namedetails=1&accept-language=nl&limit=3&polygon_threshold=0.0');
    xhr.setRequestHeader('X-RapidAPI-Key', 'c38d36ac02msh1616276a4babbe5p16058ejsnc1d528a7db56');
    xhr.setRequestHeader('X-RapidAPI-Host', 'forward-reverse-geocoding.p.rapidapi.com');
    xhr.setRequestHeader('Access-Control-Allow-Origin', 'localhost:4200');

    xhr.send(data);
    this.showDropdown = !this.showDropdown;
  }

  selectChoice(choice: any) {
    if (choice.address.country == "Nederland" || choice.address.country == "België") {
      this.postalCode = choice.address.postcode
      this.street = choice.address.road
      this.houseNumber = choice.address.house_number
      this.city = this.getCity(choice)
      this.country = choice.address.country
      this.form.patchValue({
        adres: `${this.street} ${this.houseNumber}, ${this.postalCode} ${this.city} (${this.country})`
  ,
        // andere velden van het formulier moeten hier ook opgenomen worden
      });  
      this.adresAdded = true;
    } else {
      this.toastr.error("Voorlopig is het enkel mogelijk om aan te kopen op een belgisch of nederlands adres!")
    }
    // Voer hier acties uit voor de geselecteerde keuze
    this.showDropdown = false; // Sluit de dropdown na selectie
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

    get extra(): FormControl {
      return this.form.get('extra') as FormControl;
    }

    get adres(): FormControl {
      return this.form.get('adres') as FormControl;
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