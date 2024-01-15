import { Injectable } from '@angular/core';
import { CartItem } from './cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cart:CartItem[]=[];

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
    const idx=this.getCartIndex(id);  
    switch(type){
      case "add":
        if(idx<0) this._cart.push({id,qty:count?count:0});
        else if(count) this._cart[idx].qty=count;
        break;
      case "remove":
        if(idx>=0) this._cart.splice(idx,-1);
    }
  } 
}
