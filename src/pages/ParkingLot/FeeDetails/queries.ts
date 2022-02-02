import {  useQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from '../../../infrastructure/ApiHelper';

//Delivery Fee
const getDeliveryFeeSchd = async () => {
    const options: AxiosRequestConfig = {
        method: 'get',
        url: 'api/pricing-fee-service/fees/frequencies'
    };
    const { data } = await axios(options);
    return data;
};

export const useGetDelivaryFeeSchd = () => {
    return useQuery(["getDeliveryFeeSchd"], () => getDeliveryFeeSchd());
};

//Product Types
const getLotProductTypes = async (lotId: string) => {
    if(lotId) {
    const options: AxiosRequestConfig = {
        method: 'get',
        url: `api/customer-service/lots/${lotId}/productTypes?countryCode=us`
    };
    const { data } = await axios(options);
    return data;
    }
};

export const useGetLotProductTypes = (lotId: string) => {
    return useQuery(["getLotProductTypes", lotId], () => getLotProductTypes(lotId));
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
const getLotVehicleTypes = async () => {
        const options: AxiosRequestConfig = {
            method: 'get',
            url: 'api/vehicle-service/vehicle-types'
        };
        const { data } = await axios(options);
        return data;
};

export const useGetLotVehicleTypes = () => {
    return useQuery(["getLotVehicleTypes"], () => getLotVehicleTypes());
};

//Asset Type Dropdown 
const getLotAssetTypes = async () => {
        const options: AxiosRequestConfig = {
            method: 'get',
            url: 'api/product-service/assets?countryCode=us&skipPagination=true'
        };
        const { data } = await axios(options);
        return data;
};

export const useGetLotAsserTypes = () => {
    return useQuery(["getLotAssetTypes"], () => getLotAssetTypes());
};