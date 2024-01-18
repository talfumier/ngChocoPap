import { Component, ElementRef, Input,OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css', 
})
export class CounterComponent implements OnInit {
  @Input() id:string=""; 
  @Input() type:string[]=[]; 

  private _count:number=0;

  constructor(private service:CartService) {}

   ngOnInit(): void {     
    const idx=this.service.getCartIndex(this.id);
    if(idx>=0) this._count=this.service.cart[idx].qty; //initialize count property to existing cart item if any  
   } 
  
  get count():number{
    return this._count;
  }
  set count(value:number) {
    this._count=value;
  }
  handleCartIncrement(cs:number){
    console.log("handleCartIncrement")
    if(cs<0 && this._count===0) return;
    this._count+=cs;
    if(this.type[0]==="remove"){ 
      this.service.cart[this.service.getCartIndex(this.id)].qty=this._count;
      // console.log(this.serviceDom.elt);
      // this.serviceDom.elt.setValue("")
      // console.log(this.serviceDom.inputElt.nativeElement.value)
    }
  }  
}
