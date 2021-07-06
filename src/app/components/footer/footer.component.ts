import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  currentYear: number;

  @Output()
  dataEvent = new EventEmitter<any>();

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }

  public onLinkClick(): void {
    this.dataEvent.emit(undefined);
  }
}
