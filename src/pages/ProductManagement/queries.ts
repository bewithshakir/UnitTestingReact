/* eslint-disable @typescript-eslint/no-unused-vars */
import { useInfiniteQuery, useQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from '../../infrastructure/ApiHelper';
import { pageDataLimit } from "../../utils/constants";


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
    if (productCd) {
        const options: AxiosRequestConfig = {
            method: 'get',
            url: `/api/product-service/product/products?countryCode=us&productClassCd=${productCd}`
        };
        const { data } = await axios(options);
        return data;
    }
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

const getProductsByLotId = async (pageParam: number, lotId: string) => {
    if (lotId) {
        const payload: AxiosRequestConfig = {
            method: 'get',
            url: `/api/customer-service/lot/${lotId}/product?countryCode=us&limit=${pageDataLimit}&offset=${pageParam}`
        };
        const { data } = await axios(payload);
        return data;
    }
};
export const useProductsByLotId = (lotId: string) => {
    return useInfiniteQuery(["getProductsByLotId", lotId], ({ pageParam = 0 }) => getProductsByLotId(pageParam, lotId), {
        getNextPageParam: (lastGroup: any) => {
            if (lastGroup.data.pagination.offset < lastGroup.data.pagination.totalCount) {
                return lastGroup.data.pagination.offset + pageDataLimit;
            }
        },
        keepPreviousData: true
    });
};
