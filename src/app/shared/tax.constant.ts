export const NORMAL_TAX_RATES = [
    {
        bracket: 1,
        lowerBound: 0,
        upperBound: 68507,
        rate: 0.3710
    }, {
        bracket: 2,
        lowerBound: 68507,
        upperBound: Infinity,
        rate: 0.4950
    }
]

export const PENSION_TAX_RATES = [
    {
        bracket: 1,
        lowerBound: 0,
        upperBound: 35129,
        rate: 0.1920
    }, {
        bracket: 2,
        lowerBound: 35129,
        upperBound: 68507,
        rate: 0.3710
    }, {
        bracket: 3,
        lowerBound: 68507,
        upperBound: Infinity,
        rate: 0.4950
    }
]

export const PENSION_AGE = 67;