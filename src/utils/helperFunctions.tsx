export const maskPhoneNumber = (phNumber:string) => {
    if (typeof phNumber === 'string'){
        const maskedPh = phNumber.match(/(\d{3})(\d{3})(\d{4})/);
        return maskedPh ?"(" + maskedPh[1] + ") " + maskedPh[2] + "-" + maskedPh[3]:phNumber;
    }else{
        return phNumber;
    }
};