import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  currentYear: number;

  @Output() 
  dataEvent = new EventEmitter<any>();

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear()
  }

  public onClickFooterMenuItem(): void {
    this.dataEvent.emit(undefined);
  }

}
