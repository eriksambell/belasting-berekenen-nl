import { NORMAL_TAX_RATES, PENSION_TAX_RATES } from "src/app/shared/tax-rates.constant";
import { Tax } from "./tax";

describe("Calculate Tax", () => {
  it("should use the regular tax rates for age < 67 year", () => {
    const calcTax = new Tax({ income: 3000, age: 50 });
    expect(calcTax.taxRates).toEqual(NORMAL_TAX_RATES);
  });

  it("should use the regular tax rates for age => 67 year", () => {
    const calcTax = new Tax({ income: 3000, age: 75 });
    expect(calcTax.taxRates).toEqual(PENSION_TAX_RATES);
  });

  it("should result in tax of 0 if income is 0", () => {
    const calcTax = new Tax({ income: 0, age: 50 });
    expect(calcTax.brackets.length).toEqual(1);
    expect(calcTax.brackets[0]).toEqual(0);
  });

  it("should result in one tax bracket if income is in first tax bracket", () => {
    const incomeValue = 1;
    const calcTax = new Tax({ income: incomeValue, age: 50 });
    expect(calcTax.brackets.length).toEqual(1);
    expect(calcTax.brackets[0]).toEqual(incomeValue * NORMAL_TAX_RATES[0].rate);
  });

  it("should result in two tax brackets if income is in second bracket", () => {
    const incomeValue = NORMAL_TAX_RATES[1].lowerBound;
    const calcTax = new Tax({ income: incomeValue, age: 50 });
    expect(calcTax.brackets.length).toEqual(2);
  });

  it("should correctly return the amount of income for each tax bracket for working people", () => {
    const incomeValue = 100000;
    const calcTax = new Tax({ income: incomeValue, age: 50 });
    const bracket1 = NORMAL_TAX_RATES[0].upperBound * NORMAL_TAX_RATES[0].rate;
    const bracket2 = (incomeValue - NORMAL_TAX_RATES[0].upperBound) * NORMAL_TAX_RATES[1].rate;
    expect(calcTax.brackets).toEqual([bracket1, bracket2]);
  });

  it("should correctly return the amount of income for each tax bracket for old people", () => {
    const incomeValue = 100000;
    const calcTax = new Tax({ income: incomeValue, age: 80 });
    const bracket1 = PENSION_TAX_RATES[0].upperBound * PENSION_TAX_RATES[0].rate;
    const bracket2 =
      (PENSION_TAX_RATES[1].upperBound - PENSION_TAX_RATES[0].upperBound) *
      PENSION_TAX_RATES[1].rate;
    const bracket3 = (incomeValue - PENSION_TAX_RATES[1].upperBound) * PENSION_TAX_RATES[2].rate;
    expect(calcTax.brackets).toEqual([bracket1, bracket2, bracket3]);
  });
});
