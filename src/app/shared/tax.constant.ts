export const NORMAL_TAX_RATES = [
    {
        box: 1,
        lowerBound: 0,
        upperBound: 68507,
        rate: 0.3710
    }, {
        box: 2,
        lowerBound: 68508,
        upperBound: Infinity,
        rate: 0.4950
    }
]

export const PENSION_TAX_RATES = [
    {
        box: 1,
        lowerBound: 0,
        upperBound: 35129,
        rate: 0.1920
    }, {
        box: 2,
        lowerBound: 35130,
        upperBound: 68507,
        rate: 0.3710
    }, {
        box: 3,
        lowerBound: 68508,
        upperBound: Infinity,
        rate: 0.4950
    }
]

export const PENSION_AGE = 67;