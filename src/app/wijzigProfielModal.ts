import { Component, ElementRef, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UserServiceService } from "./_services/user-service.service";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CustomValidators } from "./_helpers/customvalidator";
import { Club } from "./model/club";
import { StorageService } from "./_services/storage.service";
import { User } from "./model/user";
import { ProductService } from "./_services/product.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'wijzig-profiel',
  templateUrl: '../assets/modals/wijzig-profiel.html',
  styleUrls: ["../assets/vendor/css/bundle.min.css", "../assets/vendor/css/jquery.fancybox.min.css", "../assets/vendor/css/cubeportfolio.min.css",
    "../assets/vendor/css/owl.carousel.min.css", "../assets/vendor/css/wow.css", "../assets/vendor/css/LineIcons.min.css", '../styles.css', "../assets/vendor/css/swiper.min.css"],

})
export class WijzigProfielComponent {
  form: FormGroup = new FormGroup({
    street: new FormControl(null, []),
    extra: new FormControl(null, []),
    houseNumber: new FormControl(null, []),
    postalCode: new FormControl(null, []),
    country: new FormControl(null, []),
    city: new FormControl(null, []),
    cl: new FormControl(null, [])
    //birthdate: new FormControl(null,[Validators.required])
  },
    { validators: CustomValidators.passwordsMatching }
  );
  public clubs: Club[] = [];
  public suggestions: Club[] = [];
  public profielClubs: Club[] = [];
  public errorMessage: any;
  public currentUser: any;
  constructor(public dialogRef: MatDialogRef<WijzigProfielComponent>, private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: {}, private userService: UserServiceService, private productService: ProductService,public elem: ElementRef, public router: Router, public storageService: StorageService) {

      this.productService.profielClubs().subscribe((profielClubs) => {
          console.log(profielClubs);
          this.clubs = this.storageService.getClubs();
          this.currentUser = this.storageService.getUser();
          this.profielClubs = profielClubs;
        });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  suggest() {
    this.suggestions = this.clubs
      .filter(c => c.name.toLowerCase().includes(this.cl.value.toLowerCase()))
      .slice(0, 3);
  }

  addClub(club: Club) {
    this.suggestions=[];
    this.form.controls['cl'].setValue("");
    if (this.profielClubs.length < 4)
      this.profielClubs.push(club);
    else
      this.errorMessage = "Kan geen vierde ploeg toevoegen"
  }

  deleteClub(index: number) {
    this.profielClubs.splice(index, 1);
  }

  confirmBox() {
    console.log(this.profielClubs)
    this.userService.adaptProfile(new User(this.currentUser.id, "", "", "", "", new Date(), 0, 0, this.form.get('country')?.value, this.form.get('postalCode')?.value, this.form.get('city')?.value, this.form.get('street')?.value, this.form.get('houseNumber')?.value, "", [], this.profielClubs, 0, 0)).subscribe((result) => {
      console.log(result);
      this.toastr.success("Profiel succesvol gewijzigd");
      this.onNoClick();
    })
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

  get cl(): FormControl {
    return this.form.get('cl') as FormControl;
  }

  get postalCode(): FormControl {
    return this.form.get('postalCode') as FormControl;
  }

  get extra(): FormControl {
    return this.form.get('extra') as FormControl;
  }

}