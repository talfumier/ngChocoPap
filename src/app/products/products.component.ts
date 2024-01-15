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

  private _filter:Filter={} as Filter;
  private _products:Product[]=[];

  constructor(private service:ProductsService){
    this._cats= [{key:"tous",value:"Tous"},{key:"blanc",value:"Chocolat blanc"},{key:"lait",value:"Chocolat au lait"},{key:"noir",value:"Chocolat noir"},{key:"noix",value:"Noix/Noisette"},{key:"fruit",value:"Fruit"},{key:"caramel",value:"Caramel"},{key:"liqueur",value:"Liqueur"}];
    this._prices=[{key:"min",value:"Prix min."},{key:"max",value:"Prix max."}];    
    this._priceOptions={min:[0,5,10,15,20],max:[5,10,15,20,25]};
    this._notes=[{key:"min",value:"Note min."},{key:"max",value:"Note max."}];   
    this._noteOptions=[0,1,2,3,4,5];
    
    this._filter=this.getDefaultFilter();
    
    this._products=this.service.products;  
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
  getDefaultCategories(){
    const categories:any={};
    this._cats.map((cat) => {
      categories[cat.key]=cat.key!=="tous"?false:true;
    })
    return categories;
  }
  getDefaultFilter(){
    const price:any={},note:any={};
    this._prices.map((prc) => {
      price[prc.key]="";
    })
    this._notes.map((nt) => {
      note[nt.key]="";
    })
    return {categories:this.getDefaultCategories(),price,note} as Filter;
  }
  handleFilterChange(form:NgForm){  
    let categories:Filter["categories"]={...form.value.categories} as Filter["categories"]; 
    if(form.value.categories.tous){
      if(!this._filter.categories.tous) {
        categories=this.getDefaultCategories();
        form.setValue({...form.value,categories});
      }
      if(JSON.stringify(form.value.categories).lastIndexOf("true")>8){
        categories={...form.value.categories,tous:false}
        form.setValue({...form.value,categories});
      }
    } 
    this._filter={...form.value,categories};
    const criteria:Criteria={categories:[],price:form.value.price,note:form.value.note};
    let obj:any=this._filter.categories;
    Object.keys(obj).map((key) => {
      if(obj[key]) criteria.categories.push(key);
    })
    
    this._products=this.service.getFilteredProducts(criteria);
  }  
  filterReset (form:NgForm){
    form.setValue(this.getDefaultFilter());
    this._filter={...form.value};    
    this._products=this.service.products;   
}
}
export interface KeyValue {
  key:string,value:string
}
interface PriceOptions {
  "min":number[],"max":number[]
}
interface Filter{
  categories: {
    tous:boolean,blanc:boolean,lait:boolean,noir:boolean,noix:boolean,fruit:boolean,caramel:boolean,liqueur:boolean
  },
  price:{
    min:string,max:string
  },
  note:{
    min:string,max:string
  }
}
export interface Criteria {
  categories:any[],
  price:MinMax,
  note:MinMax
}
export interface MinMax {
  min:string,max:string
}