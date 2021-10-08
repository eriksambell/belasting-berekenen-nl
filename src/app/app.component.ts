import { Component } from "@angular/core";
import { User } from "./shared/tax";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  user: User | undefined;

  public getUserInput(event: User | undefined): void {
    this.user = event;
  }
}
