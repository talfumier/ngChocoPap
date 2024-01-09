import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private _active:number=0;

  ngOnInit(): void {
    this.runTimer();
  }
  runTimer() {
    let i=1;
    setInterval(() => {
      i++;
      if(i>3) i=1;
      this._active=i;
    },5000);
  }
  setClass (){
    let active:any={bg1:false,bg2:false,bg3:false};
    active[`bg${this._active}`]=true;
    return active;
  }

}
