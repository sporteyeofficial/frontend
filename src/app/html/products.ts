import { Component } from '@angular/core';
import { Shirt } from '../model/shirt';

let shirts: Array<Shirt>;
shirts = new Array<Shirt>();
shirts.push(new Shirt("blue","M",9,"lewandowski","Bayern munich",50,"2015-2016"))

@Component({
    selector: 'get-products',
    templateUrl: '../html/products.html',
    
  })
  export class ngForShirts {
    shirts: any[] = shirts;
    
  }
