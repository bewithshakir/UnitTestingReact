/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from "../../../infrastructure/ApiHelper";

const createCustomer = async (payload: any) => {

    const options: AxiosRequestConfig = {
        method: 'post',
        url: '/api/customer-service/customers',
        data: payload,
    };
    const { data } = await axios(options);
    return data;
};

const editCustomer = async (payload: any, customerId: string) => {

    const options: AxiosRequestConfig = {
        method: 'put',
        url: `/api/customer-service/customers/${customerId}`,
        data: payload
    };
    const { data } = await axios(options);
    return data;
};
const uploadContractFiles = async (payload: any, customerId: string) => {
    const options: AxiosRequestConfig = {
        method: 'post',
        url: `/api/customer-service/customers/${customerId}/files`,
        data: payload,
    };

    const { data } = await axios(options);
    return data;
};


const getFrequencies = async () => {
    const options: AxiosRequestConfig = {
        method: 'get',
        url: '/api/config-service/customers/invoice-frequencies?countryCode=us'
    };
    const { data } = await axios(options);
    return data;
};

const getPaymentTypes = async () => {
    const options: AxiosRequestConfig = {
        method: 'get',
        url: '/api/config-service/customers/payment-types?countryCode=us'
    };
    const { data } = await axios(options);
    return data;
};

const getCustomerData = async (customerId: string, isTrigger: boolean) => {
    if (customerId != "") {
        const options: AxiosRequestConfig = {
            method: 'get',
            url: `/api/customer-service/customers/${customerId}?countryCode=us`
        };
        const { data } = await axios(options);
        return data;
    }
};

export const useGetFrequencies = () => {
    return useQuery(["getFrequencies"], () => getFrequencies());
};

export const useGetPaymentTypes = () => {
    return useQuery(["getPaymentTypes"], () => getPaymentTypes());
};


export const useCreateCustomer = (onError: any, onSuccess: any) => {
    return useMutation((payload: any) =>
        createCustomer(payload), {
        onError,
        onSuccess,
        retry: false,
    });
};

export const useEditCustomer = (customerId: string, onSuccess: any, onError: any) => {
    return useMutation((payload: any) =>
        editCustomer(payload, customerId), {
        onSuccess,
        onError,
        retry: false
    });
};

export const useGetCustomerData = (customerId: string, isTrigger: boolean, onSuccess: any, onError: any) => {
    return useQuery(["getCustomer", customerId, isTrigger, onSuccess, onError],
        () => getCustomerData(customerId, isTrigger), {
        onSuccess,
        onError,
        retry: false
    });
};

export const useUploadContractFile = (customerId: string, onError: any, onSuccess: any) => {
    return useMutation((payload: any) => uploadContractFiles(payload, customerId), { onError, onSuccess });
};