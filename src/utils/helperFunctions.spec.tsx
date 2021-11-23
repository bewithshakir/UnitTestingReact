import { getCheckBoxDisabledByPaymentType, maskPhoneNumber, formatFileSizeUnit } from './helperFunctions';

describe('getCheckBoxDisabledByPaymentType', () => {
    it ('default', () => {
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
    it('0 Bytes', () => {
        expect(formatFileSizeUnit(0)).toBe('0 Bytes');
    });
    it('10 Bytes', () => {
        expect(formatFileSizeUnit(10)).toBe('10Bytes');
    });
});


