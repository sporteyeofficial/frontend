import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { backend, frontend } from "src/environments";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
    withCredentials: true
  };

@Injectable({
    providedIn: 'root'
  })
  export class ProductService {
    private apiUrl = frontend.url;

  
    constructor(private http: HttpClient) { }

    getProducts() : Observable<any>{
        return this.http.get(`${this.apiUrl}/auth/product`, { withCredentials: true });
    }

    fetchShirts() : Observable<any> {
      return this.http.get(`${this.apiUrl}/user/shirts`, httpOptions);
    }

    fetchClubs() : Observable<any> {
      return this.http.get(`${this.apiUrl}/user/clubs`, httpOptions);
    }

    profielClubs() : Observable<any> {
      return this.http.get(`${this.apiUrl}/auth/unwantedClubs`, httpOptions);
    }

    getSizes(productId: Number) : Observable<any> {
      return this.http.get(`${this.apiUrl}/user/product/` + productId  + `/sizes`, httpOptions);
    }
  }