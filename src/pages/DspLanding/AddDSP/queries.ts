import { useMutation, useQuery } from "react-query";
import { AxiosRequestConfig, AxiosResponse } from "axios";
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

const fetchDspDetail = (query: any)=> {
    const options: AxiosRequestConfig = {
        method: 'get',
        url: `api/customer-service/dsp/${query}`
    };
    return axios(options);
};

export const useEditDspData = (query: string | undefined, onSuccess: any, onError: any) => {
    return useQuery(['edit-dsp-detail', query], ()=> fetchDspDetail(query), {
        onSuccess,
        onError,
        enabled: !!query,
        select: (response: AxiosResponse)=> {
            const { data } = response.data;
            return {
                dspName: data.dspName,
                contactNm: data.contactName,
                email: data.contactEmailId,
                phone: data.contactPhoneNumber,
                addressLine1: data.addressLine1,
                addressLine2: data.addressLine2,
                city: data.cityNm,
                state: data.stateNm,
                postalCode: data.postalCd
            };
        },
        retry: false,
    });
};

const updateDspData = async (payload: DSPModel, dspId: string | undefined) => {
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
        method: 'put',
        url: `/api/customer-service/dsp/${dspId}`,
        data: finalPayload
    };
    const { data } = await axios(options);
    return data;
};

export const useUpdateDspData = (dspId: string | undefined, onSuccess: any, onError: any) => {
    return useMutation((payload: DSPModel) =>
        updateDspData(payload, dspId), {
        onSuccess,
        onError,
        retry: false,
    });
};