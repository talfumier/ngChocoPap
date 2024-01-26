import {Injectable, inject} from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Firestore,collection,getDocs,query } from '@angular/fire/firestore';
import _ from 'lodash';
import { Product } from './product';
import { MinMax, Filter } from '../products/products.component';
import jsonData from "./products.json";

@Injectable({
  providedIn: 'root',
  })

export class FirebaseService {  
  private _products:Product[]=[];
  private _filtered:Product[]=[];
  private _activeFilter:Filter={} as Filter;

  constructor(private db:Firestore) {
  }

  get products():Product[]{
    return this._products;
  }
  set products(data:Product[]) {
    this._products=data;
  }
  get filtered(){
    return this._filtered;
  }
  set filtered(data:Product[]){
    this._filtered=data;
  }
  get activeFilter():Filter{
    return this._activeFilter;
  }
  set activeFilter(data:Filter){
    this._activeFilter=data;
  }
  async initProducts():Promise<Product[]>{
    let result:Array<Product>=[];
    try {
      const response=await getDocs(query(collection(this.db, 'products')));
      response.docs.map(product => {
        result.push(product.data() as Product);
      }) ; 
    } catch (error) {
        result=jsonData;
    }  
    return result;  
  } 
  getProductById(id:string):Product {
    if(!id) return {} as Product;
    return _.filter(this._products,(product) => {
      return product.id===id;
    })[0];
  }

  setFilteredProducts(filter:Filter):void{
    this._activeFilter=filter;
    const criteria:Criteria={categories:[],price:filter.price,note:filter.note};
    let obj:any=filter.categories;
    Object.keys(obj).map((key) => {
      if(obj[key]) criteria.categories.push(key);
    })
    this._filtered= _.filter(this._products,(product:any) => {
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

export const productsResolver: ResolveFn<Product[]> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(FirebaseService).initProducts();
  };

interface Criteria {
  categories:any[],
  price:MinMax,
  note:MinMax
}
