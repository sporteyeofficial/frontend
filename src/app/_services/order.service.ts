import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { backend } from "src/environments";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  };

@Injectable({
    providedIn: 'root'
  })
  export class OrderService {
    private apiUrl = backend.url;

  
    constructor(private http: HttpClient) { }

    getShirts(orderId: number) : Observable<any> {
      return this.http.get(`${this.apiUrl}/user/order/` + orderId + `/shirts`, httpOptions);
    }

    pickShirt(shirtId: number, mysterieShirtId: number) : Observable<any> {
      return this.http.post(`${this.apiUrl}/user/`+ mysterieShirtId +`/order/` + shirtId + `/shirtpick`, httpOptions);
    }

    showShirt(mysterieShirtId: number) : Observable<any> {
        return this.http.post(`${this.apiUrl}/user/`+ mysterieShirtId +`/order/show`, httpOptions);
    }

    changeShirt(mysterieShirtId: number) : Observable<any> {
      return this.http.post(`${this.apiUrl}/user/`+ mysterieShirtId +`/order/change`, httpOptions);
    }

  }