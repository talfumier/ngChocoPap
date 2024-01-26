import { Component, ElementRef } from '@angular/core';
import _ from 'lodash';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../services/cartItem';
import { ModalService } from '../../services/modal.service';
import { ToastService } from '../../services/toast.service';
import { CounterComponent } from '../counter/counter.component';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent{
  private _cart:CartItem[]=[];

  constructor(private serviceCart:CartService,private serviceModal:ModalService, private toastService:ToastService){ 
    this._cart=serviceCart.cart;
  }

  get cart():CartItem[]{
    this._cart=this.serviceCart.cart;
    return this._cart;
  }  
  getTotalPrice():number {
    let total=0,price=0;
    this.serviceCart.cart.map((item) => {
      price=item.data?item.data?.price:0;
      total+=price*item.qty
    })
    return total;
  }
  reset(){
    this.serviceCart.cart=[];
    const result:ElementRef<HTMLInputElement>[]=_.filter(CounterComponent.getElements(),(elt:ElementRef<HTMLInputElement>) => {
      return !elt.nativeElement.id.includes("remove")
    });
    result.map((elt:ElementRef<HTMLInputElement>) => {
      elt.nativeElement.value="0";
    });
    CounterComponent.setElements(result);
  }
  submit(){
    this.toastService.toastSuccess("Votre panier a été validé avec succès !");   
  }
  close():void{
    this.serviceModal.close();
  }  
}
