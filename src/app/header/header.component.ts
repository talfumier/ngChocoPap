import { Component,HostListener} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isToggled:boolean=false;
  handleToggle(){
    this.isToggled=!this.isToggled;
  }
  @HostListener('window:resize', ['$event'])
    onWindowResize() {
      if(window.outerWidth>=450) this.isToggled=false;
  }
}