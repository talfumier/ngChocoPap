import { Component,Input, OnInit } from '@angular/core';
import { Product } from '../../services/product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  @Input() data:Product={} as Product;
  private _product:Product={} as Product;  

  constructor(private service:CartService){}

  ngOnInit(): void {
    this._product=this.data;
  }
  get product(){
    return this._product;
  }
  handleCartAction(type:string,id:string,evt:Event){
    evt.stopPropagation();
    this.service.handleCartAction("add",this._product.id);
  }
}
