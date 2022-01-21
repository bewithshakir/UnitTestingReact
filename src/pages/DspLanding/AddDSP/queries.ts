import { useMutation } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from "../../../infrastructure/ApiHelper";
import DSPModel from "../../../models/DSPModel";

export interface PayloadAddDspInt {
    customerId: string,
    dspName : string,
    contactName: string,
    contactEmailId: string,
    contactPhoneNumber: string,
    addressLine1: string,
    addressLine2: string,
    cityNm: string,
    stateNm: string,
    postalCd: number
}
const addDsp = async (payload: DSPModel) => {
    const finalPayload: PayloadAddDspInt = {
        customerId: payload.customerId,
        dspName : payload.dspName,
        contactName: payload.contactNm,
        contactEmailId: payload.email,
        contactPhoneNumber: payload.phone,
        addressLine1: payload.addressLine1,
        addressLine2: payload.addressLine2,
        cityNm: payload.city,
        stateNm: payload.state,
        postalCd: +payload.postalCode
    };
    const options: AxiosRequestConfig = {
        method: 'post',
        url: 'api/customer-service/dsp',
        data: finalPayload,
    };
    const { data } = await axios(options);
    return data;
};


export const useAddDsp = (onSuccess: any, onError: any) => {
    return useMutation((payload: DSPModel) =>
    addDsp(payload), {
        onError,
        onSuccess,
        retry: false,
    });
};