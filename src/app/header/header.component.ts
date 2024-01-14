import { Component,HostListener} from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartItem } from '../services/cartItem';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private _isToggled:boolean=false;
  private cart:CartItem[]=[];
  constructor(private service:CartService) {
    this.cart=service.cart;
  }
  getCartItemCount():number{   
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
}