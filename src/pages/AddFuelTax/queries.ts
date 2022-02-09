import { useMutation, useQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from "../../infrastructure/ApiHelper";

const fetchFuelTypeList = async () => {
    const options: AxiosRequestConfig = {
        method: 'get',
        url: '/api/product-service/products?countryCode=us&skipPagination=true&productGroups=["Fuel", "Non-Fuel"]'
    };
    const { data } = await axios(options);
    return data;
};

interface FuelType {
    productNm: string
    productCd: string
    activeInactiveInd: string
}

export const useGetFuelTypeList = () => {
    return useQuery(['fetchFuelTypeList'], () => fetchFuelTypeList(), {
        retry: false,
        select: (response) => {
            const fuelTypeList = response?.data.filter((obj: FuelType) => obj.activeInactiveInd === "Y")
                .map((data: FuelType) => ({
                    value: data.productCd.trim(),
                    label: data.productNm.trim(),
                }));
            return fuelTypeList;
        }
    });
};

const addFuelTax = async (payload: any) => {

    const options: AxiosRequestConfig = {
        method: 'post',
        url: '/api/tax-service/fuel-taxes',
        data: payload,
    };
    const { data } = await axios(options);
    return data;
};

export const useAddFuelTax = (onSuccess: any, onError: any) => {
    return useMutation((payload: any) => addFuelTax(payload), {
        onSuccess,
        onError,
        retry: false
    });
};

const fetchSaleTax = async (query: any) => {
    const options: AxiosRequestConfig = {
        method: 'get',
        url: `api/tax-service/fuel-taxes/cities${query}`
    };
    return axios(options);
};

export const useGetFuelTax = (query: any, onSuccess: any, onError: any) => {
    return useQuery(['get-fuel-tax'], () => fetchSaleTax(query), {
        onSuccess,
        onError,
        enabled: !!query,
        retry: false,
    });
};

const editFuelTax = async (payload: any,) => {
    const options: AxiosRequestConfig = {
        method: 'put',
        url: `/api/tax-service/fuel-taxes`,
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