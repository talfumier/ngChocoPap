import { Component, Input,OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css', 
})
export class CounterComponent implements OnInit {
  @Input() id:string=""; 
  private _count:number=0;

  constructor(private service:CartService) {}

   ngOnInit(): void {     
    const idx=this.service.getCartIndex(this.id);
    if(idx>=0) this._count=this.service.cart[idx].qty; //initialize count property to existing cart item if any  
   } 
  
  get count():number{
    return this._count;
  }
  handleCartIncrement(cs:number){
      if(cs<0 && this._count===0) return;
      this._count+=cs;
  }  
}
