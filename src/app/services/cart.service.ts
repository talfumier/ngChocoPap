import { Injectable } from '@angular/core';
import _ from "lodash";
import { CartItem } from './cartItem';
import { Product } from './product';
import { FirebaseService } from './firebase.service';
import { CounterComponent } from '../cart/counter/counter.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cart:CartItem[]=[];

  constructor(private fbs:FirebaseService){}

  get cart():CartItem[]{
    return this._cart;
  }
  set cart(value:CartItem[]){
    this._cart=value;
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
        const product:Product=this.fbs.getProductById(id);
        this._cart.push({id,qty:count?count:0,data:{image:product.image,title:product.title,price:product.price}});  
        const arr=_.filter(this._cart,(item) => {
          return item.id===id;
        });
        if(arr.length===2) {
          idx=this._cart.indexOf(arr[0]);
          this._cart.splice(idx,1);
        }
        break;
      case "remove":
         this._cart=_.filter(this._cart,((item) => {
           return item.id!==id;
         }))
         CounterComponent.getElementById(id).value=0;
    }
  } 
}
