import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  year = new Date().getFullYear();

  @Output() dataEvent = new EventEmitter<any>();

  clickMenu(){
    this.dataEvent.emit(undefined);
  }

  constructor() { }
}
