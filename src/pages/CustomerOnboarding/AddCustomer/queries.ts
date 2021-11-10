/* eslint-disable no-debugger */
/* eslint-disable no-console */
import { useMutation, useQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from "../../../infrastructure/ApiHelper";

const createCustomer = async (payload: any) => {

    const options: AxiosRequestConfig = {
        method: 'post',
        url: '/api/customer-service/customers?countryCode=us',
        data: payload,
    };
    const { data } = await axios(options);
    return data;
};

const editCustomer = async (payload: any, customerId: string) => {

    const options: AxiosRequestConfig = {
        method: 'put',
        url: `/api/customer-service/customers/${customerId}?countryCode=us`,
        data: payload
    };
    const { data } = await axios(options);
    return data;
};


const getFrequencies = async () => {
    const options: AxiosRequestConfig = {
        method: 'get',
        url: '/api/customer-service/customers/invoiceFrequency?countryCode=us'
    };
    const { data } = await axios(options);
    return data;
};

const getPaymentTypes = async () => {
    const options: AxiosRequestConfig = {
        method: 'get',
        url: '/api/customer-service/customers/paymentType?countryCode=us'
    };
    const { data } = await axios(options);
    return data;
};

const getCustomerData = async (customerId: string, isTrigger: boolean, isGetMethodCalled: boolean) => {
    if(customerId != "" ) {    
        console.log("in get API call " + isTrigger);
        console.log("in get API call " + isGetMethodCalled);
        const options: AxiosRequestConfig = {
            method: 'get',
            url: `/api/customer-service/customers/${customerId}?countryCode=us`
        };
        const { data } = await axios(options);
        return data;
    }
};

const getCustomerFilterData = async (filters?: { [k: string]: any }) => {
    const query = new URLSearchParams();
    if (filters) {
        for (const [key, val] of Object.entries(filters)) {
            query.append(key, Array.isArray(val) ? JSON.stringify(val) : val);
        }
    }
    const options: AxiosRequestConfig = {
        method: 'get',
        url: `/api/customer-service/customers/filterData?${query.toString()}`
    };
    const { data } = await axios(options);
    return data;
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

export const useEditCustomer = (customerId: string) => {
    return useMutation((payload: any) => editCustomer(payload, customerId));
};

export const useGetCustomerData = (customerId: string, isTrigger: boolean, isGetMethodCalled: boolean) => {
    return useQuery(["getCustomer", customerId, isTrigger, isGetMethodCalled], () => getCustomerData(customerId, isTrigger, isGetMethodCalled));

export const useGetCustomerFilterData = (payload?: any) => {
    return useQuery(['getCustomerFilterData', payload], () => getCustomerFilterData(payload));
};