import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  clickedEvent: Event;

  childEventClicked(event: Event){
    this.clickedEvent = event;
  }

  ngOnInit() {

  }

}
