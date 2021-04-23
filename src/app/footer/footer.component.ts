import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  year: number;

  @Output() 
  dataEvent = new EventEmitter<any>();

  ngOnInit(): void {
    this.year = new Date().getFullYear()
  }

  public onClickFooterMenuItem(): void {
    this.dataEvent.emit(undefined);
  }

}
