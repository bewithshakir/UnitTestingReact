import { useMutation, useQuery } from "react-query";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "../../../infrastructure/ApiHelper";
import UserModel from "../../../models/UserModel";

export interface PayloadAddDspInt {
    customerId: string,
    userName: string,
    contactName: string,
    contactEmailId: string,
    contactPhoneNumber: string,
    addressLine1: string,
    addressLine2: string,
    cityNm: string,
    stateNm: string,
    postalCd: number
}



const addDsp = async (payload: UserModel) => {
    const finalPayload: PayloadAddDspInt = {
        customerId: payload.customerId,
        userName: payload.userName,
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
        url: `api/customer-service/customers/${payload.customerId}/dsps`,
        data: finalPayload,
    };
    const { data } = await axios(options);
    return data;
};


export const useAddUser = (onSuccess: any, onError: any) => {
    return useMutation((payload: UserModel) =>
        addDsp(payload), {
        onError,
        onSuccess,
        retry: false,
    });
};

const fetchDspDetail = (customerId: string | undefined, query: string | undefined,) => {
    const options: AxiosRequestConfig = {
        method: 'get',
        url: `api/customer-service/customers/${customerId}/dsps/${query}`
    };
    return axios(options);
};

export const useEditUserData = (customerId: string | undefined, query: string | undefined, onSuccess: any, onError: any) => {
    return useQuery(['edit-dsp-detail', customerId, query], () => fetchDspDetail(customerId, query), {
        onSuccess,
        onError,
        enabled: !!query,
        select: (response: AxiosResponse) => {
            const { data } = response.data;
            return {
                userName: data.userName,
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

const updateDspData = async (payload: UserModel, dspId: string | undefined) => {
    const finalPayload: PayloadAddDspInt = {
        customerId: payload.customerId,
        userName: payload.userName,
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
        url: `/api/customer-service/customers/${payload.customerId}/dsps/${dspId}`,
        data: finalPayload
    };
    const { data } = await axios(options);
    return data;
};

export const useUpdateUserData = (dspId: string | undefined, onSuccess: any, onError: any) => {
    return useMutation((payload: UserModel) =>
        updateDspData(payload, dspId), {
        onSuccess,
        onError,
        retry: false,
    });
};