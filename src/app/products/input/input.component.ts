import { Component,Input,HostListener, OnInit } from '@angular/core';
import { ControlContainer, NgModelGroup } from '@angular/forms';
import { KeyValue } from '../products.component';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  viewProviders: [{ provide: ControlContainer, useExisting: NgModelGroup }]
})
export class InputComponent implements OnInit  {  
  @Input() cat:KeyValue={} as KeyValue;  
  @Input() value:boolean=false;   
  
  ngOnInit(): void {
    this.value=this.cat.key === 'tous' ? true : false;
  }
  private _highlighted:boolean=false;
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
