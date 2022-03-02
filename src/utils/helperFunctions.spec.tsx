import { getCheckBoxDisabledByPaymentType, maskPhoneNumber, formatFileSizeUnit, getSeachedDataTotalCount } from './helperFunctions';

describe('getCheckBoxDisabledByPaymentType', () => {
    it('default', () => {
        expect(getCheckBoxDisabledByPaymentType('')).toBeTruthy();
    });
    it('Invoice', () => {
        expect(getCheckBoxDisabledByPaymentType('Invoice')).toBeTruthy();
    });
    it('Internal', () => {
        expect(getCheckBoxDisabledByPaymentType('Internal')).toBeTruthy();
    });
    it('Voyager', () => {
        expect(getCheckBoxDisabledByPaymentType('Voyager')).toBeTruthy();
    });
    it('WEX', () => {
        expect(getCheckBoxDisabledByPaymentType('WEX')).toBeFalsy();
    });
});

describe('maskPhoneNumber', () => {
    it('type string', () => {
        expect(maskPhoneNumber('9900990099')).toBe('(990) 099-0099');
    });
    it('type string', () => {
        expect(maskPhoneNumber('9')).toBe('9');
    });
});

describe('formatFileSizeUnit', () => {
    it('0 MB', () => {
        expect(formatFileSizeUnit(0)).toBe('0 MB');
    });
    it('0 MB', () => {
        expect(formatFileSizeUnit(10)).toBe('0 MB');
    });
});

describe('getSeachedDataTotalCount', () => {
    it('count should 0', () => {
        expect(getSeachedDataTotalCount({ pages: [{ data: { pagination: { totalCount: 0 } } }] }, ['result(s) found', 'results found'])).toBe('0 result(s) found');
    });
    it('count should 2', () => {
        expect(getSeachedDataTotalCount({ pages: [{ data: { pagination: { totalCount: 2 } } }] }, ['result(s) found', 'results found'])).toBe('2 results found');
    });
});


