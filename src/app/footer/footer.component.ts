import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  year = new Date().getFullYear();

  @Output() eventClicked  = new EventEmitter<String>();

  clickMenu(){
    this.dataService.setData(undefined);
    this.toTop();
    this.eventClicked.emit(undefined);
  }
  toTop(){
    window.scroll(0,0);
  }
  constructor(private dataService:DataService) { }
}
