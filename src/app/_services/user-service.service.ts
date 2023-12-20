import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../model/user';
import { Login } from '../model/login';
import { Observable } from 'rxjs/internal/Observable';
import { backend, frontend } from 'src/environments';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private apiUrl = frontend.url;

  constructor(private http: HttpClient) { }

  create(user: User): Observable<any> {
      return this.http.post(`${this.apiUrl}/auth/register`, JSON.stringify(user), httpOptions);
  }

  login(login: Login) : Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, JSON.stringify(login), httpOptions);
  }

  getUserOrders(page: number, pageSize: number) : Observable<any> {
      return this.http.get(`${this.apiUrl}/auth/orders?page=` + page + `&size=` + pageSize, httpOptions);
  }

  getUserTokens() : Observable<any> {
      return this.http.get(`${this.apiUrl}/auth/tokens`, httpOptions);
  }

  adaptProfile(user: User) : Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/changeUser`, JSON.stringify(user) ,httpOptions);
  }

  logout(): Observable<any> {
      return this.http.post(`${this.apiUrl}/auth/logout`, {}, httpOptions);
  }

  veranderWachtwoordAanvraag(email: string) {
    console.log(email);
    return this.http.post(`${this.apiUrl}/auth/resetPassword?email=`+email, {}, httpOptions);
  }

  veranderWachtwoordUitvoering(wachtwoord: string, token: string) {
    return this.http.post(`${this.apiUrl}/auth/passwordChange?token=` + token, JSON.stringify({email: "", password: wachtwoord}), httpOptions);
  }


}
