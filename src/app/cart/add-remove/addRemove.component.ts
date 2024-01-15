import { Component,Input } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-addRemove',
  templateUrl: './addRemove.component.html',
  styleUrl: './addRemove.component.css'
})
export class AddRemoveComponent {  
  @Input() id:string="";
  @Input() type:string[]=[];
  @Input() count?:number=0;  

  constructor(private service:CartService) {}

  handleCartAction(evt:Event){
    evt.stopPropagation();
    this.service.handleCartAction(this.type[0],this.id,this.count);
  }
}
