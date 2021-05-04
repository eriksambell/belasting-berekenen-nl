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

  // tax input
  tarieven = {
    vanaf: [0, 20834, 34817, 65507],
    werkend: [0.3665, 0.3810, 0.3810, 0.5175],
    pensioen: [0.1875, 0.2020, 0.3810, 0.5175]
  }
  pensioenleeftijd = 67;
  mNota = [];

  // tax functions
  totalTax(income: number, age: number) {
    let schijven = this.tarieven.vanaf.map(x => 0);
    let tarief = this.tarieven.werkend;
    if (age >= this.pensioenleeftijd) tarief = this.tarieven.pensioen;

    for (let i = 0; i < this.tarieven.vanaf.length - 1; i++) {
      if (income >= this.tarieven.vanaf[i] && income < this.tarieven.vanaf[i + 1]) {
        schijven[i] = tarief[i] * (income - this.tarieven.vanaf[i]) / 12;
        return schijven;
      } else {
        schijven[i] = tarief[i] * (this.tarieven.vanaf[i + 1] - this.tarieven.vanaf[i]) / 12;
      }
    }

    // laatste schijf
    const last = this.tarieven.vanaf.length - 1;
    schijven[last] = tarief[last] * (income - this.tarieven.vanaf[last]) / 12;

    console.log(schijven);

    return schijven;
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
    if (income <= this.taxRates[0].upperBound) return [income];

    const nrOfBrackets: number = this.taxRates.find(bracket => income >= bracket.lowerBound && income <= bracket.upperBound).bracket;
    const brackets = [this.taxRates[0].upperBound * this.taxRates[0].rate];
    let remainingIncome = income - this.taxRates[0].upperBound;
    for (let i = 1; i < nrOfBrackets; i++) {
      if (i === nrOfBrackets - 1) {
        brackets[i] = remainingIncome * this.taxRates[i].rate
      } else {
        remainingIncome = income - this.taxRates[i].upperBound;
        brackets[i] = (this.taxRates[i].upperBound - this.taxRates[i - 1].upperBound) * this.taxRates[i].rate; 
      }
    }
    return brackets;
  }

}
