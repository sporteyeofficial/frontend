export class UserRangschikking {
    username: String;
    totalPoints: number;
    matchFullJuist: number;
    matchHalfJuist: number;
    matchFullFout: number;
    constructor(username: String, totalPoints: number, matchFullJuist: number, matchFullFout: number, matchHalfJuist: number) {
        this.username = username;
        this.totalPoints = totalPoints;
        this.matchFullFout = matchFullFout;
        this.matchFullJuist = matchFullJuist;
        this.matchHalfJuist = matchHalfJuist;
    }
}