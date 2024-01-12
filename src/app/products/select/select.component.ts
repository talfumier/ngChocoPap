import { Component,Input, OnInit,HostListener  } from '@angular/core';
import { NgModel,ControlContainer, NgModelGroup } from '@angular/forms';
import { KeyValue } from '../products.component';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
  viewProviders: [{ provide: ControlContainer, useExisting: NgModelGroup }]
})
export class SelectComponent implements OnInit {
  @Input() cat:KeyValue={} as KeyValue;  
  @Input() options:number[]=[];
  @Input() unit?:string="";
  private _highlighted:boolean=false;
  private _after:boolean=false;
  ngOnInit(): void {    
    if(this.unit) this._after=true;
  }
  onSelected(model:NgModel){
    // console.log(model);
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

}
