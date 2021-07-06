import { NORMAL_TAX_RATES, PENSION_AGE, PENSION_TAX_RATES } from "./tax.constant";

export interface UserInput {
  income: number;
  age: number;
}

export class CalculateTax {
  user: UserInput;
  brackets: number[] = [];
  taxRates: {
    bracket: number;
    lowerBound: number;
    upperBound: number;
    rate: number;
  }[];

  constructor(userInput: UserInput) {
    this.user = userInput;
    this.taxRates = userInput.age < PENSION_AGE ? NORMAL_TAX_RATES : PENSION_TAX_RATES;
    this.brackets = this.calcBrackets(userInput.income);
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
    });

    return brackets;
  }
}
