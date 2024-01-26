import { Component,Input, OnInit,HostListener  } from '@angular/core';
import { ControlContainer, NgModelGroup } from '@angular/forms';
import { KeyValue, MinMax } from '../products.component';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
  viewProviders: [{ provide: ControlContainer, useExisting: NgModelGroup }]
})
export class SelectComponent implements OnInit {
  @Input() cat:KeyValue={} as KeyValue;  
  @Input() options:(string|number)[]=[];
  @Input() unit?:string="";  
  @Input() filter:MinMax={} as MinMax;

  private _highlighted:boolean=false;
  private _after:boolean=false;
  private _value:string|number="";

  ngOnInit(): void {    
    this._value=this.filter[this.cat.key as keyof MinMax];
    if(this.unit) this._after=true;
  }
  
  @HostListener('mouseenter') mouseover(event :Event){
    this._highlighted=true;
  }
  @HostListener('mouseleave') mouseleave(event :Event){
    this._highlighted=false;
  }
  get highlighted (){
    return this._highlighted;
  }
  get after () {
    return this._after;
  }
  get value(){
    return this._value;
  }
  set value(data){
    this._value=data;
  }
}
