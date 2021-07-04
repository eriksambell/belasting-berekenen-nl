import { Component, Output, EventEmitter, OnInit } from "@angular/core";
import { CalculateTax } from "src/app/shared/calculateTax";

interface FormInput {
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
  styleUrls: ["./hero.component.scss"],
})
export class HeroComponent implements OnInit {
  @Output()
  totalTax = new EventEmitter<number>();

  fields: FormInput[] = [
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

  ngOnInit(): void {}

  public submit(): void {
    const tax = new CalculateTax(this.fields[0].value, this.fields[1].value);
    const total = tax.brackets.reduce((sum, current) => sum + current);
    this.totalTax.emit(total);
  }
}
