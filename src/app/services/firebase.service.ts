import { Injectable } from '@angular/core';
import { Firestore,collection,collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  
  constructor(private fs:Firestore) { 
  }

  getProducts(){
    let productsCollection=collection(this.fs,"products");
    return collectionData(productsCollection,{idField:"id"});
  }
}
