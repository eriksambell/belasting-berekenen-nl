import { Component, OnInit } from "@angular/core";
import { BUDGET, BudgetItem } from "src/app/shared/budget.constant";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  revenue: number;
  expenditure = 337;
  year = 2021;

  ngOnInit(): void {
    this.revenue = Math.round(
      BUDGET.map((item: BudgetItem) => item.amount).reduce(
        (sum: number, current: number) => sum + current
      )
    );
  }
}
