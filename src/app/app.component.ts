import { Component } from "@angular/core";
import { UserInput } from "./shared/tax";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  user: UserInput | undefined;

  public getUserInput(event: UserInput | undefined): void {
    this.user = event;
  }
}
