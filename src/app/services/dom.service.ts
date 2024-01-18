import { ElementRef, Injectable, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomService {
  private _elt:any;
  // constructor(private _renderer:Renderer2){}

  set elt(value:any){
    this._elt=value;
  }
  get elt():Renderer2 {
    return this._elt as Renderer2;
  }
}
