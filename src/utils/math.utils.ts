import Decimal from 'decimal.js';

export function totalPricePerGallon(manualPriceAmt: number | string, addedPriceAmt: number | string, discountPriceAmt: number | string, precision: number) {
    const x = new Decimal(manualPriceAmt);
    const result = x.plus(addedPriceAmt).minus(discountPriceAmt);
    return result.toFixed(precision, Decimal.ROUND_DOWN);
}