/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from '../../infrastructure/ApiHelper';


const getProductNames = async () => {
    const options: AxiosRequestConfig = {
        method: 'get',
        url: '/api/product-service/product/products?countryCode=us'
    };
    const { data } = await axios(options);
    return data;
};

export const useGetProductNames = () => {
    return useQuery(["getProductNames"], () => getProductNames());
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