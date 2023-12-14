import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CustomValidators } from "../_helpers/customvalidator";
import { UserServiceService } from "../_services/user-service.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'password-change',
    templateUrl: '../html/password.html',
    styleUrls: ["../../assets/vendor/css/bundle.min.css","../../assets/vendor/css/LineIcons.min.css","../../assets/vendor/css/cubeportfolio.min.css","../../assets/vendor/css/jquery.fancybox.min.css",
    "../../assets/vendor/css/owl.carousel.min.css","../../assets/vendor/css/swiper.min.css","../../assets/vendor/css/wow.css","../../assets/vendor/css/LineIcons.min.css","../../assets/vendor/css/bundle.min.css",
    "../../assets/vendor/css/cubeportfolio.min.css",'../../styles.css',"../../assets/vendor/css/jquery.fancybox.min.css","../../assets/vendor/css/owl.carousel.min.css","../../assets/vendor/css/swiper.min.css","../../assets/vendor/css/wow.css"],
  })
  export class PasswordComponent {
    form: FormGroup = new FormGroup({
        password:new FormControl(null,[Validators.required]),
        passwordConfirm:new FormControl(null,[Validators.required]),
        //birthdate: new FormControl(null,[Validators.required])
    },
    { validators: CustomValidators.passwordsMatching });
    public token: any;
    public errorMessage: any;
    constructor(private userService: UserServiceService, private activatedRoute: ActivatedRoute, private router: Router) {
        this.activatedRoute.queryParams.subscribe(params => {
            this.token = params['token']; // Print the parameter to the console. 
        });
    }

    get password(): FormControl {
        return this.form.get('password') as FormControl;
    }

    get passwordConfirm(): FormControl {
        return this.form.get('passwordConfirm') as FormControl;
    }

    wijzigWachtwoord() {
        this.userService.veranderWachtwoordUitvoering(this.form.get("password")?.value, this.token).subscribe({
            next: data => {
                this.router.navigateByUrl('/home?message=Wachtwoord is succesvol gewijzigd').then(() => {
                    window.location.reload();
                });
            },
            error: err => {
                    this.errorMessage = err.error.message;
              }
            });
    }

  }