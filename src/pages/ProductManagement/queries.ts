/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from '../../infrastructure/ApiHelper';


const getProductTypes = async () => {
    const options: AxiosRequestConfig = {
        method: 'get',
        url: '/api/product-service/product/productType?countryCode=us'
    };
    const { data } = await axios(options);
    return data;
};

export const useGetProductTypes = () => {
    return useQuery(["getProductTypes"], () => getProductTypes());
};

const getProductNames = async (productCd: string) => {
        const options: AxiosRequestConfig = {
            method: 'get',
            url: `/api/product-service/product/products?countryCode=us&productClassCd=${productCd}`
        };
        const { data } = await axios(options);
        return data;
};

export const useGetProductNames = (productCd: string) => {
    return useQuery(["getProductNames", productCd], () => getProductNames(productCd));
};

const getPricingModel = async () => {
    const options: AxiosRequestConfig = {
        method: 'get',
        url: '/api/customer-service/pricing-model?countryCode=us'
    };
    const { data } = await axios(options);
    return data;
};

export const useGetPricingModel = () => {
    return useQuery(["getPricingModel"], () => getPricingModel());
};