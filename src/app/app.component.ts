import { AfterViewInit, Component, OnInit, ViewChildren,QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { CounterComponent } from './cart/counter/counter.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit{
  @ViewChildren('wrapper') counters!: QueryList<any>
  
  ngAfterViewInit() {
    this.counters.forEach(alertInstance => console.log(alertInstance));
  }
  constructor(private router:Router) {}
  ngOnInit(): void {
    // this.router.navigate(['']);//Make sure home page is displayed after page reload
  }
}
