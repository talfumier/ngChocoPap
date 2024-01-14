import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Product } from '../services/product';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';
import { CartItem } from '../services/cartItem';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  private _product:Product={}as Product;
  private _cartItem:CartItem={} as CartItem;
  private _count:number=0;

  constructor(private route: ActivatedRoute, private serviceProd:ProductsService, private serviceCart:CartService){
    const id = this.route.snapshot.paramMap.get("id");
    if(id) this._product=serviceProd.getProductById(id);
    try {
      this._cartItem=serviceCart.getCartItem(this._product.id);
      this._count=this._cartItem.qty;      
    } catch (error) {
    }
  }

  get product():Product{
    return this._product;
  }  
  get cartItem():CartItem {
    return this._cartItem;
  }
  get count():number {
    return this._count
  }
  handleCartIncrement(cs:number){
    if(cs<0 && this._count===0) return;
    this._count+=cs;
  }
  handleCartAction(type:string,id:string){
    this.serviceCart.handleCartAction("add",this._product.id,this._count);
  }
}
