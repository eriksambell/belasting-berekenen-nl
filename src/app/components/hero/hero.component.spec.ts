import { NORMAL_TAX_RATES, PENSION_TAX_RATES } from 'src/app/shared/tax.constant';
import { HeroComponent, CalculateTax } from './hero.component';

describe('HeroComponent', () => {
    let calcTax: CalculateTax;
    const income = 3000;
  
    it('should use the regular tax rates for age < 67 year', () => {
        const age = 50;
        const calcTax = new CalculateTax(income, age);
        expect(calcTax.taxRates).toEqual(NORMAL_TAX_RATES);
    })

    it('should use the regular tax rates for age => 67 year', () => {
        const age = 70;
        const calcTax = new CalculateTax(income, age);
        expect(calcTax.taxRates).toEqual(PENSION_TAX_RATES);
    })

    it('should result in tax of 0 if income is 0', () => {
        const age = 50;
        const income = 0;
        const calcTax = new CalculateTax(income, age);
        expect(calcTax.brackets.length).toEqual(1);
        expect(calcTax.brackets[0]).toEqual(0);
    })

    it('should result in one tax bracket with total income if income is in first tax bracket', () => {
        const age = 50;
        const income = 1;
        const calcTax = new CalculateTax(income, age);
        expect(calcTax.brackets.length).toEqual(1);
        expect(calcTax.brackets[0]).toEqual(income);
    })

    it ('should result in two tax brackets if income is in second bracket', () => {
        const age = 50;
        const income = NORMAL_TAX_RATES[1].lowerBound;
        const calcTax = new CalculateTax(income, age);
        expect(calcTax.brackets.length).toEqual(2);
    })

    it ('should correctly return the amount of income for each tax bracket for working people', () => {
        const age = 50;
        const income = 100000;
        const calcTax = new CalculateTax(income, age);
        const bracket1 = NORMAL_TAX_RATES[0].upperBound * NORMAL_TAX_RATES[0].rate;
        const bracket2 = (income - NORMAL_TAX_RATES[0].upperBound) * NORMAL_TAX_RATES[1].rate;
        expect(calcTax.brackets).toEqual([bracket1, bracket2]); 
    })

    it ('should correctly return the amount of income for each tax bracket for working people', () => {
        const age = 80;
        const income = 100000;
        const calcTax = new CalculateTax(income, age);
        const bracket1 = PENSION_TAX_RATES[0].upperBound * PENSION_TAX_RATES[0].rate;
        const bracket2 = (PENSION_TAX_RATES[1].upperBound - PENSION_TAX_RATES[0].upperBound) * PENSION_TAX_RATES[1].rate;
        const bracket3 = (income - PENSION_TAX_RATES[1].upperBound) * PENSION_TAX_RATES[2].rate;
        expect(calcTax.brackets).toEqual([bracket1, bracket2, bracket3]); 
    })});
