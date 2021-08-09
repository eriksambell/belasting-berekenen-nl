import { Component } from "@angular/core";
import { UserInput } from "./shared/tax";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  data: UserInput | undefined;

  receiveData(event: UserInput | undefined) {
    this.data = event;
  }
}
