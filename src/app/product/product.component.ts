import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../services/product';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  private _product:Product={}as Product;

  constructor(private route: ActivatedRoute, private fbs:FirebaseService){
    if(this.fbs.products.length===0)
      this.route.data.subscribe(
        ({products}) => {
          fbs.products=products;
        });
    const id = this.route.snapshot.paramMap.get("id");
    if(id) this._product=fbs.getProductById(id);
  }

  get product():Product{
    return this._product;
  } 
}
