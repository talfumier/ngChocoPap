import { Component } from '@angular/core';
import { Product } from '../services/product';
import { ProductsService } from '../services/products.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  private _cats:KeyValue[];
  private _prices:KeyValue[];
  private _priceOptions:PriceOptions={} as PriceOptions;
  private _notes:KeyValue[];
  private _noteOptions:number[];
  private _products:Product[]=[];
  constructor(private service:ProductsService){
    this._cats= [{key:"tous",value:"Tous"},{key:"blanc",value:"Chocolat blanc"},{key:"lait",value:"Chocolat au lait"},{key:"noir",value:"Chocolat noir"},{key:"noix",value:"Noix/Noisette"},{key:"fruit",value:"Fruit"},{key:"caramel",value:"Caramel"},{key:"liqueur",value:"Liqueur"}];
    this._prices=[{key:"pmin",value:"Prix min."},{key:"pmax",value:"Prix max."}];    
    this._priceOptions={pmin:[0,5,10,15,20],pmax:[5,10,15,20,25]};
    this._notes=[{key:"nmin",value:"Note min."},{key:"pmax",value:"Note max."}];   
    this._noteOptions=[0,1,2,3,4,5];
    this._products=service.getProducts();   
  }
  get cats (){
    return this._cats;
  }
  get prices(){
    return this._prices;
  }
  get priceOptions(){
    return this._priceOptions;
  }
  get notes(){
    return this._notes;
  }
  get noteOptions(){
    return this._noteOptions;
  }
  get products(){
    return this._products;
  }
  reset (f:NgForm){
    console.log(f)
  }
}
export interface KeyValue {
  key:string,value:string
}
export interface PriceOptions {
  "pmin":number[],"pmax":number[]
}

