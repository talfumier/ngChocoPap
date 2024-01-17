import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../services/cartItem';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent{
  private _cart:CartItem[]=[];

  constructor(private serviceCart:CartService,private serviceModal:ModalService){ 
    this._cart=serviceCart.cart;
  }
  
  get cart():CartItem[]{
    return this._cart;
  }
  close():void{
    this.serviceModal.close();
  }  
}
