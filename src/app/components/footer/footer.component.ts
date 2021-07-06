import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent {
  @Output()
  linkClick = new EventEmitter<void>();

  currentYear = new Date().getFullYear();

  public onLinkClick(): void {
    this.linkClick.emit();
  }
}
