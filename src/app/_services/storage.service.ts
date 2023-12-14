import { Injectable } from '@angular/core';
import { UserServiceService } from './user-service.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Club } from '../model/club';

const USER_KEY = 'auth-user';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private apiUrl = 'http://localhost:8080/api';
  constructor(private userService: UserServiceService, private http: HttpClient) { }

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return user;
  }

  public getClubs() : Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/clubs`, httpOptions);
  }

  public saveTokens(tokens: any) {
    const user = JSON.parse(window.sessionStorage.getItem(USER_KEY) || '');
    if (user != '') {
      user.changeTokens = tokens.changeTokens;
      user.cheatTokens = tokens.cheatTokens;
    }
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }
}