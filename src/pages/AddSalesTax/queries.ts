import { useMutation, useQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from "../../infrastructure/ApiHelper";


const addSalesTax = async (payload: any) => {
    const options: AxiosRequestConfig = {
        method: 'post',
        url: 'api/tax-service/sales-taxes',
        data: payload,
    };
    const { data } = await axios(options);
    return data;
};


export const useAddSalesTax = (onError: any, onSuccess: any) => {
    return useMutation((payload: any) =>
        addSalesTax(payload), {
        onError,
        onSuccess,
        retry: false,
    });
};

// interface PayloadProps {

// }
const fetchSaleTax = async (query: any) => {
    const options: AxiosRequestConfig = {
        method: 'get',
        url: `api/tax-service/sales-taxes/cities${query}`
    };
    return axios(options);
};

export const useGetSaleTax = (query: any, onSuccess: any, onError: any) => {
    return useQuery(['get-sale-tax'], () => fetchSaleTax(query), {
        onSuccess,
        onError,
        enabled: !!query,
        retry: false,
    });
};

const editSaleTax = async (payload: any,) => {
    const options: AxiosRequestConfig = {
        method: 'put',
        url: `/api/tax-service/sales-taxes`,
        data: payload
    };
    const { data } = await axios(options);
    return data;
};

export const useEditSalesTax = (onSuccess: any, onError: any) => {
    return useMutation((payload: any) => editSaleTax(payload), {
        onSuccess,
        onError,
        retry: false
    });
};