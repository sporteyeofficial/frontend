// Creating the table class
export class Shirt {
    // defining the properties of the table class with default values
    id: number;
    size: string;
    number: number;
    club: string;
    season: string;
    price: number;
    name: string;
    shirtImg: string;
    clubName: string;
    clubImg: string;

    
    // constructor of the table class
    constructor(id: number,size: string,number: number, name: string,club: string,price: number,season: string, shirtImg: string, clubName: string, clubImg: string) {
       this.id=id;
       this.size = size;
       this.number=number;
       this.shirtImg=shirtImg;
       this.clubImg=clubImg;
       this.club=club;
       this.price=price
       this.season=season;
       this.name=name;
       this.clubName=clubName;
    }
 }