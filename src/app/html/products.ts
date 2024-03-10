import { Component } from '@angular/core';
import { Shirt } from '../model/shirt';

@Component({
    selector: 'get-products',
    templateUrl: '../html/products.html',
    
  })
  export class ngForShirts {
    shirts: any[] = [];
    
  }
