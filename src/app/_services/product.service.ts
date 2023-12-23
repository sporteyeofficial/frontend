import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { backend } from "src/environments";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'}
    )
  };

@Injectable({
    providedIn: 'root'
  })
  export class ProductService {
    private apiUrl = "https://sporteye-backend-987b3e5bb000.herokuapp.com/api";

  
    constructor(private http: HttpClient) { }

    getProducts() : Observable<any>{
        return this.http.get(`${this.apiUrl}/auth/product`, httpOptions);
    }

    fetchShirts() : Observable<any> {
      return this.http.get(`${this.apiUrl}/user/shirts`, { withCredentials: true });
    }

    fetchClubs() : Observable<any> {
      return this.http.get(`${this.apiUrl}/user/clubs`, { withCredentials: true });
    }

    profielClubs() : Observable<any> {
      return this.http.get(`${this.apiUrl}/auth/unwantedClubs`, httpOptions);
    }

    getSizes(productId: Number) : Observable<any> {
      return this.http.get(`${this.apiUrl}/user/product/` + productId  + `/sizes`, httpOptions);
    }
  }