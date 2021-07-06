import { Component } from "@angular/core";
import { UserInput } from "./shared/calculateTax";

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
