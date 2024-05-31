import { Component } from "@angular/core";
import { WijzigProfielComponent } from "../wijzigProfielModal";
import { BetscreenService } from "../_services/betscreen.service";
import { ekvoorspellingService } from "../_services/ekvoorspelling.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Match } from "../model/Match";
import { UserRangschikking } from "../model/UserRangschikking";
import { UserServiceService } from "../_services/user-service.service";
import { StorageService } from "../_services/storage.service";
import { WindowBetusernameComponent } from "../betusernamewindow";
import { WindowEKPosterComponent } from "../ekposterwindow";
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from "@angular/material/dialog";

interface MatchDay {
  date: string;
  matches: Match[];
  expanded: boolean;
}

interface GroupedMatches {
  [date: string]: Match[];
}

@Component({
    selector: 'ekvoorspelling',
    templateUrl: 'ekvoorspelling.html',
    styleUrls: ["../../assets/vendor/css/bundle.min.css","../../assets/vendor/css/LineIcons.min.css","../../assets/vendor/css/cubeportfolio.min.css","../../assets/vendor/css/jquery.fancybox.min.css",
    "../../assets/vendor/css/owl.carousel.min.css","../../assets/vendor/css/swiper.min.css","../../assets/vendor/css/wow.css","../../assets/vendor/css/LineIcons.min.css","../../assets/vendor/css/bundle.min.css",
    "../../assets/vendor/css/cubeportfolio.min.css",'../../styles.css',"../../assets/vendor/css/jquery.fancybox.min.css","../../assets/vendor/css/owl.carousel.min.css","../../assets/vendor/css/swiper.min.css","../../assets/vendor/css/wow.css"],
    
  
  })
  export class EkVoorspellingComponent {
      lastMatches: Match[] = [];
      nextMatches: Match[] = [];
      lastDayMatches: MatchDay[] = [];
      nextDayMatches: MatchDay[] = [];
      users: UserRangschikking[] = [];
      userPlace = 0;
      homescore = 0;
      awayscore = 0;
      intervalId: any;

      ngOnInit() {
        this.intervalId = setInterval(() => {
            this.nextMatches.forEach(match => this.calculateMatchRemainingTime(match));
                }, 1000);
      }

      constructor(private router: Router, private dialog: MatDialog, private BetscreenService: BetscreenService, private ekvoorspellingService: ekvoorspellingService, private userService: UserServiceService, private storageService: StorageService, private toastr: ToastrService) {
        if (this.isLoggedIn()) {
          this.ekvoorspellingService.getpreviousAndNewMatchesUser().subscribe({
            next: data => {
              this.lastMatches = data.playedMatches;
              this.lastDayMatches = this.groupMatchesByDate(this.lastMatches);
              this.nextMatches = data.unplayedMatches;
              this.nextDayMatches = this.groupMatchesByDate(this.nextMatches);
              console.log(data);
              this.users = data.top10Users;

              this.userPlace = data.userPlace;
            },
            error: err => {
              console.log(err)
            }
              
          });
        } else {
          this.ekvoorspellingService.getpreviousAndNewMatches().subscribe({
            next: data => {
              this.lastMatches = data.playedMatches;
              this.lastDayMatches = this.groupMatchesByDate(this.lastMatches);
              this.nextMatches = data.unplayedMatches;
              this.nextDayMatches = this.groupMatchesByDate(this.nextMatches);
              console.log(data);
              this.users = data.top10Users;

              this.userPlace = data.userPlace;
            },
            error: err => {
              console.log(err)
            }
              
          });
        }
      }

      openPoster() {
        console.log("open dialog");
        const dialogRef = this.dialog.open(WindowEKPosterComponent, {
          height: 'max-content',
          panelClass: 'dialogclass',
          data: {}
        });
        console.log("dialog is opened");

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      }

      isLoggedIn() {
        return this.storageService.isLoggedIn()
      }

      getUser() {
        return this.storageService.getUser();
      }

      emptyUsername() {
        if (this.storageService.getUser().betUsername) {
          return false;
        } else {
          return true;
        }
      }

      bevestigDeelname() {
        console.log("open dialog");
        const dialogRef = this.dialog.open(WindowBetusernameComponent, {
          height: 'max-content',
          panelClass: 'dialogclass',
          data: {u: this.getUser()}
        });
        console.log("dialog is opened");

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      }


      toggleExpansion(day: MatchDay): void {
        day.expanded = !day.expanded;
      }

      toggleMatchExpansion(match: Match): void {
        match.expanded = !match.expanded;
      }

      placeBet(match: Match) {
        this.BetscreenService.sendBet(match).subscribe({
          next: data => {
            window.location.reload();
            this.toastr.success(data.message);
            console.log(data)
          },
          error: err => {
            console.log(err)
            this.toastr.error("Bet niet geplaatst.");
          }
            
      });
      }

      matchBezig(match: Match) {
        let startDate = new Date(match.startdate);
        let diff = startDate.getTime() - new Date().getTime(); // Verschil in milliseconden
        let seconds = Math.floor((diff / (1000)) % 60);
        if (seconds < 0) {
          return true;
        } else {
          return false;
        }
    }

    calculateMatchRemainingTime(match: Match) {
        let startDate = new Date(match.startdate);
        let diff = startDate.getTime() - new Date().getTime(); // Verschil in milliseconden
        match.remDays = Math.floor(diff / (1000 * 60 * 60 * 24));
        match.remHours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        match.remMin = Math.floor((diff / (1000 * 60)) % 60);
        match.remSec = Math.floor((diff / (1000)) % 60);
    }

    groupMatchesByDate(matches: Match[]): MatchDay[] {
      const grouped: GroupedMatches = matches.reduce((acc: GroupedMatches, match: Match) => {
        const date = new Date(match.startdate).toDateString();
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(match);
        return acc;
      }, {});

      return Object.keys(grouped).map(date => ({
        date,
        matches: grouped[date],
        expanded: false
      }));
  }

  }