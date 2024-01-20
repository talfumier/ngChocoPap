import { AfterViewInit, Component, ElementRef, Input,OnDestroy,OnInit,ViewChild } from '@angular/core';
import _ from "lodash";
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css', 
})
export class CounterComponent implements OnInit, AfterViewInit, OnDestroy{
  @Input() id:string=""; 
  @Input() type:string[]=[]; 
  @ViewChild('counterInput') input: ElementRef={} as ElementRef;

  private _count:number=0;
  private static elts:ElementRef[]=[];

  constructor(private service:CartService) {}

   ngOnInit(): void {     
    const idx=this.service.getCartIndex(this.id);
    if(idx>=0) this._count=this.service.cart[idx].qty; //initialize count property to existing cart item if any 
   } 
   ngAfterViewInit(): void {
     CounterComponent.elts.push(this.input);
   }
   ngOnDestroy(): void {
     CounterComponent.elts.splice(CounterComponent.elts.indexOf(this.input),1);
   }
  
  get count():number{
    return this._count;
  }
  set count(value:number) {
    this._count=value;
  }
  handleFocus() {
    const cartItem=this.service.cart[this.service.getCartIndex(this.id)];
    this._count=cartItem?cartItem.qty:0;
  }
  handleCartIncrement(cs:number){
    if(cs<0 && this._count===0) return;
    this._count+=cs;
    if(this.type[0]==="remove"){ 
      this.service.cart[this.service.getCartIndex(this.id)].qty=this._count;
      CounterComponent.elts.map((elt) => {
        if((elt.nativeElement.id as string).includes("input-counter-add")) elt.nativeElement.value=this._count;
      })
    }
  }  
}
