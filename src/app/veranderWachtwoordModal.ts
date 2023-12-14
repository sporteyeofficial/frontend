import { Component, ElementRef, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UserServiceService } from "./_services/user-service.service";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CustomValidators } from "./_helpers/customvalidator";

@Component({
    selector: 'wijzig-profiel',
    templateUrl: '../assets/modals/verander-wachtwoord.html',
    styleUrls: ["../assets/vendor/css/bundle.min.css", "../assets/vendor/css/jquery.fancybox.min.css", "../assets/vendor/css/cubeportfolio.min.css",
        "../assets/vendor/css/owl.carousel.min.css", "../assets/vendor/css/wow.css", "../assets/vendor/css/LineIcons.min.css", '../styles.css', "../assets/vendor/css/swiper.min.css"],

})
export class VeranderWachtwoordComponent {
    form: FormGroup = new FormGroup({
        email: new FormControl(null, [Validators.required]),
    }
    );
    public errorMessage: any;

    constructor(public dialogRef: MatDialogRef<VeranderWachtwoordComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {}, private userService: UserServiceService, public elem: ElementRef, public router: Router) {

    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    confirmBox() {
        if (this.form.valid) {
            this.userService.veranderWachtwoordAanvraag(this.form.get("email")?.value).subscribe({
                next: data => {
                    this.router.navigateByUrl('/home?message=Wachtwoord wijzigingsemail is verstuurd.').then(() => {
                        window.location.reload();
                    });
                },
                error: err => {
                    this.errorMessage = err.error.message;
                }
            });
        }
        
    }

    get email(): FormControl {
        return this.form.get('email') as FormControl;
    }

}