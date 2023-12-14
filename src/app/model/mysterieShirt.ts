import { Shirt } from "./shirt";

export class MysterieShirt {
    // defining the properties of the table class with default values
    id: number;
    pickedShirt: Shirt;
    possibleShirts: Shirt[];
    beforeChangeShirts: Shirt[];
    shirtIsShown: boolean;
    groepId: number;
    changeClosed: boolean;
    // constructor of the table class
    constructor(id: number, pickedShirt: Shirt, possibleShirts: Shirt[], shirtIsShown: boolean, groepId: number, changeClosed: boolean, beforeChangeShirt: Shirt[]) {
        this.id = id;
        this.pickedShirt = pickedShirt;
        this.possibleShirts = possibleShirts;
        this.beforeChangeShirts = beforeChangeShirt;
        this.shirtIsShown = shirtIsShown;
        this.groepId = groepId;
        this.changeClosed = changeClosed;
     }
  }