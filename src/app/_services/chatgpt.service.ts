import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({
    providedIn: 'root'
  })
  export class ChatgptService {
    private apiUrl = 'http://localhost:8080/api';

    constructor(private http: HttpClient) { }

    sendChat(message: string) : Observable<any> {
      return this.http.post(`${this.apiUrl}/auth/chatmessage`, JSON.stringify(message), httpOptions);
    }

  }