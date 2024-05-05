import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { backend } from "src/environments";
import { Match } from "../model/Match";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  };

@Injectable({
    providedIn: 'root'
  })
  export class BetscreenService {
    private apiUrl = backend.url;

    constructor(private http: HttpClient) { }

    sendBet(bet: Match) : Observable<any> {
      return this.http.post(`${this.apiUrl}/user/bet/place`, JSON.stringify(bet), httpOptions);
    }

    getLastBet() : Observable<any> {
      return this.http.get(`${this.apiUrl}/user/bet`, httpOptions);
    }

    getLastAndNewMatch() : Observable<any> {
      return this.http.get(`${this.apiUrl}/user/matches`, httpOptions);
    }

    getLastMatch() : Observable<any> {
      return this.http.get(`${this.apiUrl}/auth/matches`, httpOptions);
    }

  }