import { useMutation, useQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from '../../infrastructure/ApiHelper';
import { getProductIcon } from '../../utils/helperFunctions';
import ProductManagementModel from "../../models/ProductManagementModel";

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
                label: data.productClassNm,
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
                label: data.name,
                icon: getProductIcon(data.name),
                hex: data.hex
            }));
            return productColors;
        }
    });
};

/**
 * Add Managaement product api
 */
interface addEditProductPayloadInt {
    countryCode: string,
    productName: string,
    productType: string,
    productColor: string,
    productStatus: string,
    productPricing: number
    productGroupId?: string,
}

const addProductManagement = async (payload: ProductManagementModel) => {
    const finalPayload: addEditProductPayloadInt = {
        countryCode: 'us',
        productName: payload.productName,
        productType: payload.productType.value,
        productColor: payload.productColor.value,
        productStatus: payload.productStatus.value,
        productPricing: +payload.productPricing
    };
    const options: AxiosRequestConfig = {
        method: 'post',
        url: '/api/product-service/product/add',
        data: finalPayload,
    };
    const { data } = await axios(options);
    return data;
};

const editProductManagement = async (payload: ProductManagementModel, productGroupCd: string, productId: string) => {
    const finalPayload: addEditProductPayloadInt = {
        countryCode: 'us',
        productName: payload.productName,
        productType: payload.productType.value,
        productColor: payload.productColor.value,
        productStatus: payload.productStatus.value,
        productPricing: +payload.productPricing,
        productGroupId: productGroupCd
    };
    const options: AxiosRequestConfig = {
        method: 'put',
        url: `/api/product-service/product/edit/${productId}`,
        data: finalPayload
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
    return useMutation((payload: ProductManagementModel) =>
        addProductManagement(payload), {
        onError,
        onSuccess,
    });
};

export const useEditProductManagement = (productId: string, productGroupCd: string, onSuccess: any, onError: any) => {
    return useMutation((payload: ProductManagementModel) =>
        editProductManagement(payload, productGroupCd, productId), {
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
