
export function truncateDecimals(num: number, decimalPlace: number) {
  const numS = num.toString();
  const decPos = numS.indexOf('.');
  const substrLength = decPos == -1 ? numS.length : 1 + decPos + decimalPlace;
  const trimmedResult = Number(numS.substr(0, substrLength));
  const finalResult = isNaN(trimmedResult) ? 0 : trimmedResult;
  return finalResult;
}
