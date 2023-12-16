import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { backend } from "src/environments";


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({
    providedIn: 'root'
  })
  export class ChatgptService {
    private apiUrl = backend.url;

    constructor(private http: HttpClient) { }

    sendChat(message: string) : Observable<any> {
      return this.http.post(`${this.apiUrl}/auth/chatmessage`, JSON.stringify(message), httpOptions);
    }

  }