import { League } from "./league";

export class Club {
    team_id: number;
    name: string;
    logo: string;
    league: League;

    constructor(team_id: number, name: string,
        logo: string, league: League) {
        this.team_id = team_id;
        this.name = name;
        this.logo = logo;
        this.league=league;
    }

}