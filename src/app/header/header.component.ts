import { Component,HostListener} from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartItem } from '../services/cartItem';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private _isToggled:boolean=false;
  private cart:CartItem[]=[];
  constructor(private serviceCart:CartService,private serviceModal:ModalService) {
    this.cart=serviceCart.cart;
  }
  getCartItemCount():number{  
    this.cart=this.serviceCart.cart
    return this.cart.length;
  }
  get isToggled():boolean {
    return this._isToggled
  }
  handleToggle(){
    this._isToggled=!this._isToggled;
  }
  @HostListener('window:resize', ['$event'])
    onWindowResize() {
      if(window.outerWidth>=450) this._isToggled=false;
  }
  cartClick(){
    const modal=this.serviceModal.getModalById("cart-modal");
    if(!modal?.isOpen) this.serviceModal.open("cart-modal");
    else this.serviceModal.close();
  }
}