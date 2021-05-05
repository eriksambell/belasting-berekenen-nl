import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { NORMAL_TAX_RATES, PENSION_AGE, PENSION_TAX_RATES } from 'src/app/shared/tax.constant';
import { HeroForm } from '../../shared/hero-form';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})

export class HeroComponent implements OnInit {

  @Output() 
  dataEvent = new EventEmitter<number>();

  inputs: HeroForm[];
  incomeInput: HeroForm;
  ageInput: HeroForm;

  ngOnInit(): void {
    this.setInputs();
  }

  public submit(): void {
    const tax = new CalculateTax(this.inputs[0].value, this.inputs[1].value);
    const total = tax.brackets.reduce((sum, current) => sum + current);
    this.dataEvent.emit(total);
  }

  private setInputs(): void {
    this.incomeInput = new HeroForm(null, "Salaris", "income", "Uw bruto maandsalaris", false, 5);
    this.ageInput = new HeroForm(null, "Leeftijd", "age", "Uw leeftijd", false, 2);
    this.inputs = [this.incomeInput, this.ageInput];
  }
}

export class CalculateTax {
  brackets: number[] = [];
  taxRates: {
    bracket: number,
    lowerBound: number,
    upperBound: number,
    rate: number
  }[];

  constructor(income: number, age: number) {
    this.taxRates = age < PENSION_AGE ? NORMAL_TAX_RATES : PENSION_TAX_RATES;
    this.brackets = this.calcBrackets(income);
  }

  private calcBrackets(income: number): number[] {
    if (!income || income === 0) return [0];

    let brackets = [];
    this.taxRates.forEach((bracket, index: number) => {
      if (income >= bracket.lowerBound) {
        const previousUpperBound = index === 0 ? 0 : this.taxRates[index - 1].upperBound;
        const amountInBracket = Math.min(income, bracket.upperBound) - previousUpperBound;
        brackets.push(amountInBracket * bracket.rate);
      }
    })

    return brackets;
  }
}
