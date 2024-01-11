import { Injectable } from '@angular/core';
import products from "./products.json";
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  getProducts():Product[]{
    return products;
  }
}
