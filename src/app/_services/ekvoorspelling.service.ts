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
  export class ekvoorspellingService {
    private apiUrl = backend.url;

    constructor(private http: HttpClient) { }

    getpreviousAndNewMatches() : Observable<any> {
      return this.http.get(`${this.apiUrl}/user/ek/matches/user`, httpOptions);
    }

    changeBetUsername(betUsername: String) : Observable<any> {
      return this.http.post(`${this.apiUrl}/auth/betusername`, betUsername, httpOptions);
    }
  }
