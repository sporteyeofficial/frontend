export class League {
    id: number;
    name: string;
    logo: string;
    country: string;

    constructor(id: number, name: string,
        logo: string,
        country: string) {
        this.id = id;
        this.name = name;
        this.logo = logo;
        this.country = country;
    }

}