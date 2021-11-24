export const maskPhoneNumber = (phNumber: string) => {
    const maskedPh = phNumber.match(/(\d{3})(\d{3})(\d{4})/);
    return maskedPh ? "(" + maskedPh[1] + ") " + maskedPh[2] + "-" + maskedPh[3] : phNumber;
};

export const formatFileSizeUnit = (sizeInBytes: number, decimals = 2) => {
    if (sizeInBytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(sizeInBytes) / Math.log(k));

    return parseFloat((sizeInBytes / Math.pow(k, i)).toFixed(dm)) + sizes[i];
};

export const getCheckBoxDisabledByPaymentType = (value: string) => {
    return {
        'WEX': false,
        'Invoice': true,
        'Internal': true,
        'Voyager': true,
        'default': true,
    }[value || 'default'];
};

export const getSeachedDataTotalCount = (data: { pages: [{ data: { pagination: { totalCount: number } } }] }, msg: string[]) => {
    const totalCount = data?.pages[0]?.data?.pagination?.totalCount || 0;
    return (`${totalCount} ${totalCount > 1 ? msg[1] : msg[0]}`);
};