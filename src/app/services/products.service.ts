import { Injectable } from '@angular/core';
import _ from "lodash";
import jsonData from "./products.json";
import { Product } from './product';
import { Criteria } from '../products/products.component';
import { MinMax } from '../products/products.component';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private _products:Product[]=[];
  constructor(){
    this._products=jsonData;
  }
  get products():Product[]{
    return this._products;
  }
  
  getProductById(id:string):Product {
    if(!id) return {} as Product;
    return _.filter(this._products,(product) => {
      return product.id===id;
    })[0];
  }
  getFilteredProducts(criteria:Criteria):Product[]{
    return _.filter(this._products,(product:any) => {
      return this.getMatchStatus(criteria,product);
    });
  }
  private getMatchStatus(criteria:Criteria,product:any):boolean{
    let status=false;
    if(criteria.categories.indexOf("tous")!==-1) status=true;
    else
      criteria.categories.map((crit:string) => {
        if(product.category[crit]) status=true;   
      })
    if(!status) return false;
    
    if(Object.values(criteria.price).join().length>1)
      status=this.getPriceNoteStatus(criteria.price,product.price);

    if(!status) return false;

    if(Object.values(criteria.note).join().length>1)
      status=this.getPriceNoteStatus(criteria.note,product.note);
    
    if(!status) return false;

    return status;   
  }
  private getPriceNoteStatus(criteria:MinMax,value:number):boolean{
    let status=false;
    let min=parseFloat(criteria.min),max=parseFloat(criteria.max);
      if(isNaN(min))min=0;
      if(isNaN(max))max=300;
      status=value>=min && value<=max?true:false;
    return status;
  }
}
