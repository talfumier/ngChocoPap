import { Injectable } from '@angular/core';
import { CartItem } from './cartItem';
import { Product } from './product';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cart:CartItem[]=[];

  constructor(private service:ProductsService){}

  get cart():CartItem[]{
    return this._cart;
  }
  getCartIndex(id:string):number {
    let i=-1;
    this._cart.map((item,idx) => {
      if(item.id===id) i=idx;
    })
    return i;
  }
  handleCartAction(type:string,id:string,count?:number) {
    let idx=this.getCartIndex(id);  
    switch(type){
      case "add":
        if(idx<0) {
          const product:Product=this.service.getProductById(id);
          this._cart.push({id,qty:count?count:0,data:{image:product.image,title:product.title,price:product.price}});
          idx=this._cart.length-1;
        }
        if(count) this._cart[idx].qty=count;
        break;
      case "remove":
        if(idx>=0) this._cart.splice(idx,-1);
    }
  } 
}
