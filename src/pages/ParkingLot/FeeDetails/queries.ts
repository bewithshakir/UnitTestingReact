import { useMutation, useQuery } from "react-query";
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

export const useGetDeliveryFeeSchd = () => {
    return useQuery(["getDeliveryFeeSchd"], () => getDeliveryFeeSchd());
};

//Product Types
const getLotProductTypes = async (lotId: string) => {
    if (lotId) {
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
    if (productCd && productCd.toLowerCase() !== 'all') {
        const options: AxiosRequestConfig = {
            method: 'get',
            url: `/api/product-service/products?countryCode=us&productGroupCd=${productCd}`
        };
        const { data } = await axios(options);
        return data;
    }
};

export const useGetLotMasterProductNames = (productCd: string) => {
    return useQuery(["getLotMasterProductNames", productCd], () => getLotMasterProductNames(productCd));
};

//Product Name (Custom) 
const getLotProductNames = async (lotId: string, productCd: string) => {
    if (lotId && productCd) {
        const options: AxiosRequestConfig = {
            method: 'get',
            url: `/api/customer-service/lots/${lotId}/products?countryCode=us&productCd=${productCd}&skipPagination=false`
        };
        const { data } = await axios(options);
        return data;
    }
};

export const useGetLotProductNames = (lotId: string, productCd: string) => {
    return useQuery(["getLotProductNames", lotId, productCd], () => getLotProductNames(lotId, productCd));
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

export const useGetLotAssetTypes = () => {
    return useQuery(["getLotAssetTypes"], () => getLotAssetTypes());
};


// Save Fee Details API
const addFeeDetails = async (payload: any) => {
    const options: AxiosRequestConfig = {
        method: 'post',
        url: 'api/pricing-fee-service/fees',
        data: payload,
    };
    const { data } = await axios(options);
    return data;
};

export const useAddFeeDetails = (onSuccess: any, onError: any) => {
    return useMutation((payload: any) =>
        addFeeDetails(payload), {
        onError,
        onSuccess,
    });
};

// Edit Fee Details API
const editFeeDetails = async (payload: any) => {
    const options: AxiosRequestConfig = {
        method: 'put',
        url: 'api/pricing-fee-service/fees',
        data: payload
    };
    const { data } = await axios(options);
    return data;
};

export const useEditFeeDetails = (onSuccess: any, onError: any) => {
    return useMutation((payload: any) => editFeeDetails(payload), { onError, onSuccess });
};

//Get Products By LotId
const getProductsDetailsByLotId = async (lotId: string, pageParam: number) => {
    if (lotId) {
        const query = new URLSearchParams();
        const productEntitySet = `/api/customer-service/lots/${lotId}/products?countryCode=us&limit=${pageParam}&offset=0`;
        const url = `${query.toString().length ? `&${query.toString()}` : ''}`;
        const payload: AxiosRequestConfig = {
            method: 'get',
            url: productEntitySet + url
        };
        const { data } = await axios(payload);
        return data;
    }
};
export const useProductsDetailsByLotId = (lotId: string, pageParam: number) => {
    return useQuery(["getProductsDetailsByLotId", lotId, pageParam], () => getProductsDetailsByLotId(lotId, pageParam));
};

const getFeeDetailsByLotId = async (lotId: string) => {

    const query = new URLSearchParams();
    query.append('parkingLotId', lotId);
    query.append('countryCode', 'us');
    const url = `/api/pricing-fee-service/fees?${query.toString()}`;
    const payload: AxiosRequestConfig = {
        method: 'get',
        url
    };

    const { data } = await axios(payload);
    return data;

};

export const useGetFeeDetailsByLotid = (lotId: string) => {
    return useQuery(['getFeeDetailsByLotId', lotId], () => getFeeDetailsByLotId(lotId));
};
