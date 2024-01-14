import { Injectable } from '@angular/core';
import _ from "lodash";
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
    _.filter(this._cart,(item,idx) => {
      if(item.id===id) {
        i=idx;
        return true;}
      return false;
    })[0];
    return i;
  }
  getCartItem (id:string):any {
    const idx=this.getCartIndex(id);
    return idx>0?this._cart[idx]:null;
  }
  handleCartAction(type:string,id:string,count?:number) {
    const idx=this.getCartIndex(id);
    switch(type){
      case "add":
        if(idx<0) this._cart.push({id,qty:count?count:0});
        else if(count) this._cart[0].qty=count;
        break;
      case "remove":
        if(idx>=0) this._cart.splice(idx,-1);
    }
  } 
}
