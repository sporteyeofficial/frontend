import { Club } from "./club";
import { League } from "./league";

export class Match {
    homeclub: Club;
    awayclub: Club;
    homescore: number;
    awayscore: number;
    venue: String;
    startdate: Date;
    leaguename: String;

    constructor(home: Club, away: Club, startdate: Date, homescore: number, awayscore: number, venue: String, leaguename: String) {
        this.homeclub = home;
        this.awayclub = away;
        this.homescore = homescore;
        this.awayscore = awayscore;
        this.venue = venue;
        this.startdate = startdate;
        this.leaguename = leaguename;
    }

}