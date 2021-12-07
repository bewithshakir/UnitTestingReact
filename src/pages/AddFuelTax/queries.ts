import { useMutation, useQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from "../../infrastructure/ApiHelper";


const addFuelTax = async (payload: any) => {

    const options: AxiosRequestConfig = {
        method: 'post',
        url: '/api/tax-service/fueltax',
        data: payload,
    };
    const { data } = await axios(options);
    return data;
};

export const useAddFuelTax = () => {
    return useMutation((payload: any) => addFuelTax(payload));
};

const fetchSaleTax = async(query: any)=> {
    const options: AxiosRequestConfig = {
        method: 'get',
        url: `api/tax-service/fueltax${query}`
    };
    return axios(options);
};

export const useGetFuelTax = (query: any, onSuccess: any, onError: any)=> {
    return useQuery(['get-fuel-tax'], ()=> fetchSaleTax(query), {
        onSuccess,
        onError,
        enabled: !!query,
        retry: false,
    });
};

const editFuelTax = async (payload: any,) => {
    const options: AxiosRequestConfig = {
        method: 'put',
        url: `/api/tax-management-service/fueltax?countryCode=us`,
        data: payload
    };
    const { data } = await axios(options);
    return data;
};

export const useEditFuelTax = (onSuccess: any, onError: any) => {
    return useMutation((payload: any) => editFuelTax(payload), {
        onSuccess,
        onError,
        retry: false
    });
};