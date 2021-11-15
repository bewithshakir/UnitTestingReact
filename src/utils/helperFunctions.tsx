export const maskPhoneNumber = (phNumber:string) => {
    if (typeof phNumber === 'string'){
        const maskedPh = phNumber.match(/(\d{3})(\d{3})(\d{4})/);
        return maskedPh ?"(" + maskedPh[1] + ") " + maskedPh[2] + "-" + maskedPh[3]:phNumber;
    }else{
        return phNumber;
    }
};

export const formatFileSizeUnit = (sizeInBytes: number, decimals = 2) => {
    if (sizeInBytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(sizeInBytes) / Math.log(k));

    return parseFloat((sizeInBytes / Math.pow(k, i)).toFixed(dm)) +  sizes[i];
};