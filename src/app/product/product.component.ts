import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../services/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  private _product:Product={}as Product;

  constructor(private route: ActivatedRoute, private service:ProductsService){
    const id = this.route.snapshot.paramMap.get("id");
    if(id) this._product=service.getProductById(id);
  }

  get product():Product{
    return this._product;
  } 
}
