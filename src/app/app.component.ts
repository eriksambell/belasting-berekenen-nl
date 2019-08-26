import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  data:number = 0;

  receiveData(event){
    this.data = event;
  }

  ngOnInit() {

  }

}
