import { Club } from "./club";

// Creating the table class
export class User {
    // defining the properties of the table class with default values
    id: number;
    surname: string;
    name: string;
    email: string;
    password: string;
    birthdate: Date;
    money: number;
    points: number;
    country: string;
    ekVoorspellingsPoints: number;
    betUsername: string;
    city: string
    street: string;
    houseNr: string;
    streetDescr: string;
    clubs: Club[];
    postalCode: string;
    cheatTokens: number;
    changeTokens: number;
    roles: string[];
    
    // constructor of the table class
    constructor(id: number,surname: string,name: string, password: string,email:string,birthdate:Date,money: number,points: number,country: string, postalCode: string, city: string,street: string, houseNr: string, streetDescr: string, roles: string[], clubs: Club[], cheatTokens: number, changeTokens: number, ekVoorspellingsPoints: number, betUsername: string) {
       this.id=id;
       this.surname = surname;
       this.betUsername = betUsername;
       this.ekVoorspellingsPoints = ekVoorspellingsPoints;
       this.name=name;
       this.email=email;
       this.changeTokens=changeTokens;
       this.cheatTokens=cheatTokens;
       this.birthdate=birthdate;
       this.password=password;
       this.money=money;
       this.points=points;
       this.country=country;
       this.postalCode = postalCode;
       this.city=city;
       this.street=street;
       this.clubs=clubs;
       this.houseNr=houseNr;
       this.streetDescr=streetDescr;
       this.roles=roles;
    }
 }