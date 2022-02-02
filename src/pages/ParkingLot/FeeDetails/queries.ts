import {  useQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from '../../../infrastructure/ApiHelper';

//Delivery Fee
const getDeliveryFeeSchd = async () => {
    const options: AxiosRequestConfig = {
        method: 'get',
        url: ''
    };
    const { data } = await axios(options);
    return data;
};

export const useGetDelivaryFeeSchd = () => {
    return useQuery(["getDeliveryFeeSchd"], () => getDeliveryFeeSchd());
};

//Product Types
const getLotProductTypes = async () => {
    const options: AxiosRequestConfig = {
        method: 'get',
        url: ''
    };
    const { data } = await axios(options);
    return data;
};

export const useGetLotProductTypes = () => {
    return useQuery(["getLotProductTypes"], () => getLotProductTypes());
};

//Master Product Name
const getLotMasterProductNames = async (productCd: string) => {
    if (productCd) {
        const options: AxiosRequestConfig = {
            method: 'get',
            url: `&productGroupCd=${productCd}`
        };
        const { data } = await axios(options);
        return data;
    }
};

export const useGetLotMasterProductNames = (productCd: string) => {
    return useQuery(["getLotMasterProductNames", productCd], () => getLotMasterProductNames(productCd));
};

//Product Name (Custom) 
const getLotProductNames = async (productCd: string) => {
    if (productCd) {
        const options: AxiosRequestConfig = {
            method: 'get',
            url: `&productGroupCd=${productCd}`
        };
        const { data } = await axios(options);
        return data;
    }
};

export const useGetLotProductNames = (productCd: string) => {
    return useQuery(["getLotProductNames", productCd], () => getLotProductNames(productCd));
};


//Vehicle Type Dropdown 
const getLotVehicleTypes = async (lotId: string) => {
    if (lotId) {
        const options: AxiosRequestConfig = {
            method: 'get',
            url: ``
        };
        const { data } = await axios(options);
        return data;
    }
};

export const useGetLotVehicleTypes = (lotId: string) => {
    return useQuery(["getLotVehicleTypes", lotId], () => getLotVehicleTypes(lotId));
};