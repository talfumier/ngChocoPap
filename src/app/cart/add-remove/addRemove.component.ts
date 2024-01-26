import { AfterViewInit, Component,ElementRef,Input, OnDestroy,ViewChild,HostListener } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-addRemove',
  templateUrl: './addRemove.component.html',
  styleUrl: './addRemove.component.css'
})
export class AddRemoveComponent  implements AfterViewInit, OnDestroy {  
  @Input() id:string="";
  @Input() type:string[]=[];
  @Input() count?:number=0;  
  
  @ViewChild('buttonAddRemove') button: ElementRef={} as ElementRef;
  @ViewChild('tooltip') tooltip: ElementRef={} as ElementRef;
  
  private static elts:ElementRef<HTMLButtonElement>[]=[];

  constructor(private service:CartService) {
  }

  ngAfterViewInit(): void {
    if(this.type[0]!=="add") return;    
    if(this.service.getCartIndex(this.id)!==-1) 
      this.button.nativeElement.classList.add("disabled")
    AddRemoveComponent.elts.push(this.button);
   }
  ngOnDestroy(): void {
    if(this.type[0]!=="add") return;
    AddRemoveComponent.elts.splice(AddRemoveComponent.elts.indexOf(this.button),1);
  }
  @HostListener('mouseenter') mouseover(event :Event){
    if(this.type[0]!=="add" || this.service.getCartIndex(this.id)===-1) return;
    this.tooltip.nativeElement.classList.replace("hidden","visible");
  }
  @HostListener('mouseleave') mouseleave(event :Event){    
    this.tooltip.nativeElement.classList.replace("visible","hidden");
  }
  static getElements():ElementRef<HTMLButtonElement>[]{
    return this.elts;
  }
  static setElements(data:ElementRef<HTMLButtonElement>[]):void{
    this.elts=data;
  }
  static getElementById(id:string,type:string):any{
    let result:any=undefined;
    this.elts.map((elt:any) => {
      if(elt.nativeElement.id===`button-${type}-${id}`)
        result=elt;
    })
    return result!==undefined?(result as ElementRef<HTMLButtonElement>).nativeElement:result;
  }

  handleCartAction(evt:Event){  
    evt.stopPropagation();  
    if(this.type[0]==="remove" || (this.type[0]==="add" && this.service.getCartIndex(this.id)===-1))    
      this.service.handleCartAction(this.type[0],this.id,this.count);
    const elt=AddRemoveComponent.getElementById(this.id,"add");
    switch(this.type[0]){
      case"add":
        if(!JSON.stringify(elt.classList).includes("disabled"))
          elt.classList.add("disabled");
        break;
      case "remove":
        elt.classList.remove("disabled");
    }
  }
}
