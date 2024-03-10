import { Injectable } from '@angular/core';
import { UserServiceService } from './user-service.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Club } from '../model/club';
import { backend } from 'src/environments';
import { Product } from "../model/product";

const USER_KEY = 'auth-user';
const PRODUCTS_KEY = "products";
const CLUBS_KEY = "clubs";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private apiUrl = backend.url;
  constructor(private userService: UserServiceService, private http: HttpClient) { }

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getProducts(): any {
    const products = window.sessionStorage.getItem(PRODUCTS_KEY);
    if (products) {
      return JSON.parse(products);
    } 

    return products;
  }

  public addProduct(product: Product): any {
    const products = window.sessionStorage.getItem(PRODUCTS_KEY);
    let plist = [];
    if (products) {
      plist = JSON.parse(products);
    } 
    plist.push(product);
    window.sessionStorage.setItem(PRODUCTS_KEY, JSON.stringify(plist));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return user;
  }

  public getClubs(): any {
    const clubs = window.sessionStorage.getItem(CLUBS_KEY);
    if (clubs) {
      return JSON.parse(clubs);
    } 

    return clubs;
  }

  public setClubs(clubs: any): any {
    window.sessionStorage.setItem(CLUBS_KEY, JSON.stringify(clubs));
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