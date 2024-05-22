import { Club } from "./club";
import { League } from "./league";

export class Match {
    fixture_id: number;
    homeclub: Club;
    awayclub: Club;
    homescore: number;
    awayscore: number;
    venue: String;
    startdate: Date;
    leaguename: String;
    remDays: number;
    remHours: number;
    remMin: number;
    remSec: number;
    timer: any;
    expanded: boolean;

    constructor(homeclub: Club, awayclub: Club, startdate: Date, homescore: number, awayscore: number, venue: String, leaguename: String, fixture_id: number) {
        this.fixture_id = fixture_id;
        this.homeclub = homeclub;
        this.awayclub = awayclub;
        this.homescore = homescore;
        this.awayscore = awayscore;
        this.venue = venue;
        this.startdate = startdate;
        this.leaguename = leaguename;
        this.remSec = 0;
        this.remMin = 0;
        this.remHours = 0;
        this.remDays = 0;
        this.expanded = false;
    }

    

}