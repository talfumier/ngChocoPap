import { Component,Input,HostListener, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { KeyValue } from '../products.component';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent  {  
  @Input() cat:KeyValue={} as KeyValue;
  private _highlighted:boolean=false;
  checked:boolean=false;

  handleChange(model:NgModel){
    this.checked=!this.checked;
    console.log(model);
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
}
