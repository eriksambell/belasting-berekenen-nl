import { Component, Output, EventEmitter, OnInit } from "@angular/core";
import { CalculateTax } from "src/app/shared/calculateTax";

interface formInput {
  id: string;
  label: string;
  tooltip: string;
  maxLength: number;
  value?: number;
  showTooltip?: boolean;
  error?: boolean;
}

@Component({
  selector: "app-hero",
  templateUrl: "./hero.component.html",
  styleUrls: ["./hero.component.css"],
})
export class HeroComponent implements OnInit {
  @Output()
  totalTax = new EventEmitter<number>();

  inputs: formInput[];

  ngOnInit(): void {
    this.inputs = this.getInputs();
  }

  public submit(): void {
    const tax = new CalculateTax(this.inputs[0].value, this.inputs[1].value);
    const total = tax.brackets.reduce((sum, current) => sum + current);
    this.totalTax.emit(total);
  }

  private getInputs(): formInput[] {
    return [
      {
        id: "income",
        label: "Salaris",
        tooltip: "Vul uw bruto maandsalaris in",
        maxLength: 5,
      },
      {
        id: "age",
        label: "Leeftijd",
        tooltip: "Vul uw leeftijd in",
        maxLength: 3,
      },
    ];
  }
}
