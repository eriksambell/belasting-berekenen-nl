import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { Tax, User } from "src/app/shared/tax";
import { BUDGET, BudgetItem } from "../../shared/budget.constant";

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
  styleUrls: ["./results.component.scss"],
})
export class ResultsComponent implements OnInit, OnChanges {
  @Input() user: User;

  budget: BudgetItem[] = BUDGET;
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

  widthFirstBox = 41 / 100; // relative width
  loadingDelay = 200; // in milliseconds

  ngOnInit(): void {
    this.setPositions();
  }

  ngOnChanges(): void {
    if (this.user) {
      this.totalTax = this.getTotalTax();
      this.totalBudget = this.getTotalBudget();
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
    const containerPaddingRight = 15;

    if (boxCentre < 0.5 * hoverWidth) {
      // hover goes off screen on left side -> positive correction
      return 0.5 * hoverWidth - 0.5 * box.clientWidth;
    } else if (boxCentre + 0.5 * hoverWidth > container.clientWidth) {
      // hover goes off screen on right side -> negative correction
      return -boxCentre - 0.5 * hoverWidth + container.clientWidth - containerPaddingRight;
    }

    // no correction necessary
    return 0;
  }

  /**
   * Calculates size of box, based on budget
   * @param budget {number} budget amount
   * @returns {number} relative box width and height
   */
  public getBoxSize(budget: number): number {
    const biggest: number = Math.sqrt(this.budget[0].amount);
    const current: number = Math.sqrt(budget);
    return (current / biggest) * this.widthFirstBox * 100;
  }

  private getTotalTax(): number {
    const tax = new Tax(this.user);
    return tax.brackets.reduce((sum: number, current: number) => sum + current);
  }

  private getTotalBudget(): number {
    return this.budget
      .map((budget: BudgetItem) => budget.amount)
      .reduce((sum: number, current: number) => sum + current);
  }

  /** Sets the levels and the position of each box */
  private setPositions(): void {
    this.budget.forEach((budget: BudgetItem) => {
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
}
