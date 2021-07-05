import { Component, Input, OnChanges } from "@angular/core";
import { CalculateTax, UserInput } from "src/app/shared/calculateTax";
import { BUDGET } from "../../shared/budget.constant";

@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.css"],
})
export class ResultsComponent implements OnChanges {
  @Input() data: UserInput;

  budget = BUDGET;
  budgetTotal: number;
  totalTax: number;
  positions = [];
  levels = [];

  ngOnChanges(): void {
    if (this.data) {
      this.calcTotal();
    }
  }

  public onResize(event: Event): number {
    const eventTarget = event.target as Window;
    return eventTarget.innerWidth;
  }

  public correctHover(container: HTMLElement, results: HTMLElement): number {
    let hoverWidth = 200;
    let containerWidth = container.clientWidth;
    let containerPos = container.getBoundingClientRect();
    let viewportWidth = results.clientWidth;
    let correctLeft = 1;
    let padding = parseInt(results.style.paddingRight);

    if (containerPos.left + 0.5 * containerWidth < 0.5 * hoverWidth) {
      // infoBox goes off screen on left side
      correctLeft = 0.5 * hoverWidth - 0.5 * containerWidth;
    } else if (
      containerPos.left + 0.5 * containerWidth + 0.5 * hoverWidth >
      viewportWidth
    ) {
      // infoBox goes off screen on right side
      correctLeft =
        -1 *
        (containerPos.left +
          0.5 * containerWidth +
          0.5 * hoverWidth -
          viewportWidth +
          padding);
    }

    // return correction of left value
    return correctLeft;
  }

  private calcTotal() {
    const tax = new CalculateTax(this.data.income, this.data.age);
    this.totalTax = tax.brackets.reduce((sum, current) => sum + current);
    let amounts = this.budget.map((x) => x.amount);
    this.budgetTotal = amounts.reduce((total, num) => total + num);
    this.setPositions();
  }

  private setPositions() {
    // set first level (no boxes placed yet)
    this.levels = [
      {
        width: 100,
        height: 0,
        fromleft: 0,
      },
    ];

    for (let i = 0; i < this.budget.length; i++) {
      let boxSize = this.setWidth(this.budget[i].amount); // set width for each box
      let usedLevel = this.levels.findIndex(function (e) {
        // find level where box fits
        return e.width > boxSize;
      });

      // set positions for box and push to array
      this.positions.push({
        left: this.levels[usedLevel].fromleft,
        bottom: this.levels[usedLevel].height,
      });

      // push new level
      let boxFromLeft = 0;
      if (usedLevel + 1 !== this.levels.length)
        boxFromLeft = this.levels[usedLevel].fromleft;

      this.levels.push({
        width: boxSize,
        height: this.levels[usedLevel].height + boxSize,
        fromleft: boxFromLeft,
      });

      // update level on which box is placed
      this.levels[usedLevel].width -= boxSize;
      this.levels[usedLevel].fromleft += boxSize;

      // sort levels array on height to enable searching lowest level
      this.levels.sort((a, b) => (a.height > b.height ? 1 : -1));
    }
  }

  private setWidth(y: number): number {
    let biggest = Math.sqrt(this.budget[0].amount / (0.25 * Math.PI));
    let current = Math.sqrt(y / (0.25 * Math.PI));
    let width = (current / biggest) * 0.41 * 100;
    return width;
  }
}
