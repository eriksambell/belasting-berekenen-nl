import { Component, Input, OnChanges } from "@angular/core";
import { CalculateTax, UserInput } from "src/app/shared/calculateTax";
import { BUDGET, BudgetLine } from "../../shared/budget.constant";

interface Position {
  left: number;
  bottom: number;
}

interface Level {
  id: number;
  width: number;
  height: number;
  fromLeft: number;
}

@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.css"],
})
export class ResultsComponent implements OnChanges {
  @Input() data: UserInput;

  budget: BudgetLine[] = BUDGET;
  totalBudget: number;
  totalTax: number;

  positions: Position[] = [];
  levels: Level[] = [
    {
      id: 0,
      width: 100,
      height: 0,
      fromLeft: 0,
    },
  ];

  widthFirstBox = 41 / 100;

  ngOnChanges(): void {
    console.log(this.data);
    if (this.data) {
      this.calcTotals();
      this.setPositions();
    }
  }

  public onResize(event: Event): number {
    const eventTarget = event.target as Window;
    return eventTarget.innerWidth;
  }

  /**
   * Corrects the x position of the hover if necessary
   * @param box {HTMLElement} budget box
   * @param container {HTMLElement} container element
   * @returns {number} correction from left in pixels
   */
  public correctHover(box: HTMLElement, container: HTMLElement): number {
    const hoverWidth = 200;
    const boxCentre: number = box.getBoundingClientRect().left + 0.5 * box.clientWidth;

    if (boxCentre < 0.5 * hoverWidth) {
      // hover goes off screen on left side -> positive correction
      return 0.5 * hoverWidth - 0.5 * box.clientWidth;
    } else if (boxCentre + 0.5 * hoverWidth > container.clientWidth) {
      // hover goes off screen on right side -> negative correction
      return (
        -boxCentre -
        0.5 * hoverWidth +
        container.clientWidth -
        parseInt(container.style.paddingRight)
      );
    }

    // no correction necessary
    return 0;
  }

  /** Calculates total tax and total budget */
  private calcTotals(): void {
    const tax = new CalculateTax(this.data.income, this.data.age);
    this.totalTax = tax.brackets.reduce((sum, current) => sum + current);

    const amounts: number[] = this.budget.map((budget: BudgetLine) => budget.amount);
    this.totalBudget = amounts.reduce((total: number, num: number) => total + num);
  }

  /** Sets the levels and the position of each box */
  private setPositions(): void {
    this.budget.forEach((budget: BudgetLine) => {
      // get width/height for box
      const boxSize: number = this.getBoxSize(budget.amount);

      // find level where box fits
      const usedLevel: Level = this.levels.find((level: Level) => level.width > boxSize);

      // set positions for box
      this.positions.push({
        left: usedLevel.fromLeft,
        bottom: usedLevel.height,
      });

      // set new level
      this.levels.push({
        id: usedLevel.id,
        width: boxSize,
        height: usedLevel.height + boxSize,
        fromLeft: usedLevel.id + 1 !== this.levels.length ? usedLevel.fromLeft : 0,
      });

      // update level on which box is placed
      usedLevel.width -= boxSize;
      usedLevel.fromLeft += boxSize;

      // sort levels array on height to enable searching lowest level
      this.levels.sort((a, b) => (a.height > b.height ? 1 : -1));
    });
  }

  /**
   * Calculates size of box
   * @param budget {number} budget amount
   * @returns {number} box width and height in pixels
   */
  private getBoxSize(budget: number): number {
    const biggestBudget: number = Math.sqrt(this.budget[0].amount);
    const currentBudget: number = Math.sqrt(budget);
    return (currentBudget / biggestBudget) * this.widthFirstBox * 100;
  }
}
