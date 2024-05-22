import { Component } from "@angular/core";
import { WijzigProfielComponent } from "../wijzigProfielModal";
import { BetscreenService } from "../_services/betscreen.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Match } from "../model/Match";
import { UserServiceService } from "../_services/user-service.service";
import { StorageService } from "../_services/storage.service";
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'betscreen',
    templateUrl: '../html/betscreen.html',
    styleUrls: ["../../assets/vendor/css/bundle.min.css","../../assets/vendor/css/LineIcons.min.css","../../assets/vendor/css/cubeportfolio.min.css","../../assets/vendor/css/jquery.fancybox.min.css",
    "../../assets/vendor/css/owl.carousel.min.css","../../assets/vendor/css/swiper.min.css","../../assets/vendor/css/wow.css","../../assets/vendor/css/LineIcons.min.css","../../assets/vendor/css/bundle.min.css",
    "../../assets/vendor/css/cubeportfolio.min.css",'../../styles.css',"../../assets/vendor/css/jquery.fancybox.min.css","../../assets/vendor/css/owl.carousel.min.css","../../assets/vendor/css/swiper.min.css","../../assets/vendor/css/wow.css"],
    
  
  })
  export class BetScreenComponent {
      lastMatch!: Match;
      nextMatch!: Match;
      days: number = 0;
      hours: number = 0;
      minutes: number = 0;
      seconds: number = 0;
      timer: any;
      aantalBets: number = 0;
      aantalWins: number = 0;
      homescore = 0;
      awayscore = 0;
      betPlaced: boolean = true;

      isLoggedIn() {
        return this.storageService.isLoggedIn()
      }

      ngOnInit(): void {
        this.timer = setInterval(() => this.calculateMatchRemainingTime(), 1000);
      }

      constructor(private router: Router, private BetscreenService: BetscreenService, private userService: UserServiceService, private storageService: StorageService, private toastr: ToastrService) {
        if (this.isLoggedIn()) {
          this.BetscreenService.getLastAndNewMatch().subscribe({
            next: data => {
              this.lastMatch = new Match(data[0].homeclub, data[0].awayclub, data[0].startdate,data[0].homescore, data[0].awayscore, ' ', data[0].leaguename, data[0].fixture_id)
              this.nextMatch = new Match(data[1].homeclub, data[1].awayclub, data[1].startdate,data[1].homescore, data[1].awayscore, ' ', data[1].leaguename, data[1].fixture_id)
              console.log(data)
            },
            error: err => {
              console.log(err)
            }
              
          });
        } else {
          this.BetscreenService.getLastMatch().subscribe({
            next: data => {
              this.lastMatch = new Match(data.home, data.away, data.startdate,data.homescore, data.awayscore, ' ', data.leaguename, data.fixture_id)
              console.log(data)
            },
            error: err => {
              console.log(err)
            }
              
          });
        }
      this.BetscreenService.getLastBet().subscribe({
          next: data => {
            if (data.homescore != 5000) {
              this.homescore = data.homescore
              this.awayscore = data.awayscore
            } else {
              this.betPlaced = false;
            }
            this.aantalBets = data.numberOfBets
            this.aantalWins = data.numberOfCorrectBets
            console.log(data)
          },
          error: err => {
            console.log(err)
          }
            
      });


      }

      placeBet() {
        this.nextMatch.homescore = this.homescore
        this.nextMatch.awayscore = this.awayscore
        this.BetscreenService.sendBet(this.nextMatch).subscribe({
          next: data => {
            window.location.reload();
            this.toastr.success(data.message);
            console.log(data)
          },
          error: err => {
            console.log(err)
          }
            
      });
      }

      calculateMatchRemainingTime() {
        let startDate = new Date(this.nextMatch.startdate);
        let diff = startDate.getTime() - new Date().getTime(); // Verschil in milliseconden
        this.days = Math.floor(diff / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        this.minutes = Math.floor((diff / (1000 * 60)) % 60);
        this.seconds = Math.floor((diff / (1000)) % 60);
      }

      matchBezig() {
        let startDate = new Date(this.nextMatch.startdate);
        let diff = startDate.getTime() - new Date().getTime(); // Verschil in milliseconden
        this.seconds = Math.floor((diff / (1000)) % 60);
        if (this.seconds < 0) {
          return true;
        } else {
          return false;
        }
      }
  }