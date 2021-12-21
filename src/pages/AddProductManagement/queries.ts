import { useMutation, useQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from '../../infrastructure/ApiHelper';

interface dataPropsInt {
    activeInactiveInd: string,
    productClassCd: string,
    productClassNm: string
}
interface colorPropsInt {
    productColorCd: string,
    name: string,
    hex: string
}
const fetchProductTypes = async (countryCode: string) => {
    const options: AxiosRequestConfig = {
        method: 'get',
        url: `/api/product-service/product/productType?countryCode=${countryCode}`
    };
    const { data } = await axios(options);
    return data;
};

export const useGetProductTypes = (countryCode: string) => {
    return useQuery(["getProductTypes"], () => fetchProductTypes(countryCode), {
        retry: false,
        select: (response) => {
            const productTypes = response?.data.map((data: dataPropsInt) => ({
                value: data.productClassCd,
                label: data.productClassNm
            }));
            return productTypes;
        }
    });
};


const fetProductColors = async (countryCode: string) => {
    const options: AxiosRequestConfig = {
        method: 'get',
        url: `/api/product-service/product/productColor?countryCode=${countryCode}`
    };
    const { data } = await axios(options);
    return data;
};

export const useGetProductColors = (countryCode: string) => {
    return useQuery(["product-colors"], () => fetProductColors(countryCode), {
        retry: false,
        select: (response) => {
            const productColors = response?.data.map((data: colorPropsInt) => ({
                value: data.productColorCd,
                label: data.name
            }));
            return productColors;
        }
    });
};

/**
 * Add Managaement product api
 */
interface addProductPayloadInt {
    countryCode: string,
    productName: string,
    productType: string,
    productColor: string,
    productStatus: string,
    productPricing: number

}
const addProductManagement = async (payload: addProductPayloadInt) => {
    const options: AxiosRequestConfig = {
        method: 'post',
        url: '/api/product-service/product/add',
        data: payload,
    };
    const { data } = await axios(options);
    return data;
};

const editProductManagement = async (payload: any, productId: string) => {

    const options: AxiosRequestConfig = {
        method: 'put',
        url: `/api/product-service/product/edit/${productId}`,
        data: payload
    };
    const { data } = await axios(options);
    return data;
};

const getProductData = async (productId: string) => {
    if (productId) {
        const options: AxiosRequestConfig = {
            method: 'get',
            url: `/api/product-service/product/details/${productId}`
        };
        const { data } = await axios(options);
        return data;
    }
};

export const useAddProductManagement = (onSuccess: any, onError: any) => {
    return useMutation((payload: addProductPayloadInt) =>
        addProductManagement(payload), {
        onError,
        onSuccess,
    });
};

export const useEditProductManagement = (productId: string, onSuccess: any, onError: any) => {
    return useMutation((payload: any) =>
        editProductManagement(payload, productId), {
        onSuccess,
        onError,
        retry: false
    });
};

export const useGetProductData = (productId: string, onSuccess: any, onError: any) => {
    return useQuery(["getProduct", productId, onSuccess, onError],
        () => getProductData(productId), {
        onSuccess,
        onError,
        retry: false
    });
};
