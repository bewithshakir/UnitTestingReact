import Decimal from 'decimal.js';

export function totalPricePerGallon(manualPriceAmt: number | string, addedPriceAmt: number | string, discountPriceAmt: number | string, precision: number) {
    const x = new Decimal(Number(manualPriceAmt) || 0);
    const result = x.plus(Number(addedPriceAmt) || 0).minus(Number(discountPriceAmt) || 0);
    return result.toFixed(precision, Decimal.ROUND_DOWN);
}