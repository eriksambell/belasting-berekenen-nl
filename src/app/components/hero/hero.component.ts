import { Component, Output, EventEmitter } from '@angular/core';
import { NORMAL_TAX_RATES, PENSION_AGE, PENSION_TAX_RATES } from 'src/app/shared/tax.constant';
import { HeroForm } from '../../shared/hero-form';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})

export class HeroComponent {

  incomeInput = new HeroForm(null, "Salaris", "income", "Uw bruto maandsalaris", false, 5);
  ageInput = new HeroForm(null, "Leeftijd", "age", "Uw leeftijd", false, 2);
  inputs = [this.incomeInput, this.ageInput];

  // send input to results component

  @Output() dataEvent = new EventEmitter<any>();
  sendData() {
    let inputData = this.totalTax(this.incomeInput.value * 12, this.ageInput.value);
    let schijvenTotal = inputData.reduce((total, num) => total + num);
    this.dataEvent.emit(schijvenTotal);
  }

  totalTax(income: number, age: number) {
    const tax = new CalculateTax(income, age);
    return tax.brackets;
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
