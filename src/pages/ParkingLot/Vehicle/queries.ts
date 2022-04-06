
import { useMutation, useQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from "../../../infrastructure/ApiHelper";

interface VehicleType {
    activeInactiveInd: "Y" | "N"
    vehicleColorCd: string
    vehicleColorHexCode: string
    vehicleColorNm: string
}

const getVehicleColors = async (countryCode: string): Promise<{ data?: VehicleType[] }> => {
    const options: AxiosRequestConfig = {
        method: 'get',
        url: `/api/vehicle-service/vehicle-colors?countryCode=${countryCode}`
    };
    const { data } = await axios(options);
    return data;
};

const selectVehice = (response: { data?: VehicleType[] }) => {
    return response?.data?.filter(obj => (obj.activeInactiveInd === 'Y'))
        .map(obj => ({
            ...obj,
            label: obj.vehicleColorNm,
            value: obj.vehicleColorCd
        })) || [];
};

export const useGetVehicleColors = (countryCode: string) => {
    return useQuery(
        ['getVehicleColors', countryCode],
        () => getVehicleColors(countryCode),
        {
            retry: false,
            select: selectVehice
        });
};


interface ProductGroups {
    activeInactiveInd: "Y"
    productGroupCd: string
    productGroupNm: "Non-Fuel" | "Add-On service" | "Fuel"
}
const getProductGroups = async (countryCode: string): Promise<{ data?: ProductGroups[] }> => {
    const options: AxiosRequestConfig = {
        method: 'get',
        url: `/api/product-service/products/product-groups?countryCode=${countryCode}`
    };
    const { data } = await axios(options);
    return data;
};

export type ProductGroupObj = {
    [k in ProductGroups['productGroupNm']]: string
}

const formatProductGroup = (response: { data?: ProductGroups[] }) => {
    return response?.data?.reduce((acc, obj) => {
        acc[obj.productGroupNm] = obj.productGroupCd;
        return acc;
    }, {} as ProductGroupObj);
};

export const useGetProductGroups = (countryCode: string) => {
    return useQuery(
        ['getProductGroups', countryCode],
        () => getProductGroups(countryCode),
        { retry: false, select: formatProductGroup }
    );
};


interface Product {
    activeInactiveInd: "Y" | "N"
    manualPricing: number
    productCd: string
    productNm: string
    [k: string]: any
}

interface Pagination {
    totalCount: number; limit: number, offset: number
}

interface ProductResponse {
    data?: Product[]
}

interface Filter {
    [k: string]: any
}

interface ProductFilter extends Filter {
    productGroupCd?: string
}

const getProducts = async (filter: ProductFilter): Promise<ProductResponse> => {
    if (!filter.productGroupCd) {
        return { data: [] };
    }
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(filter)) {
        query.append(key, value);
    }
    const url = `/api/product-service/products?${query.toString()}`;
    const options: AxiosRequestConfig = {
        method: 'get',
        url
    };
    const { data } = await axios(options);
    return data;
};

const selectProducts = (result: ProductResponse) => {
    return result.data?.filter(obj => (obj.activeInactiveInd === "Y")).map(obj => ({
        ...obj,
        label: obj.productNm,
        value: obj.productCd
    })) || [];
};

export const useGetProducts = (filters: ProductFilter) => {
    return useQuery(
        ['getProducts', filters],
        () => getProducts(filters),
        {
            retry: false,
            select: selectProducts
        });
};

interface MasterProductByProductCdFilter extends Filter {
    countryCode?: string
    skipPagination?: boolean
    productCd?: string
    productGroupCd?: string
}

interface LotProduct {
    activeInactiveInd: "Y" | "N"
    addedPriceAmt: number
    applicableProductId: string
    deliveryLocationId: string
    discountPriceAmt: number
    manualPriceAmt: 2
    opisProductKey: any
    opisRackStatus?: "Y" | "N"
    productId: string
    productNm: string
    totalPricePerGallon: string
    pricingModel: any
    productColor: any
}

interface MasterProductResponse {
    data?: {
        pagination?: Pagination;
        lotProducts: LotProduct[]
    }
}


const getMasterProducts = async (lotId: string, filter: MasterProductByProductCdFilter): Promise<MasterProductResponse> => {
    if (!filter.productCd && !filter.productGroupCd) {
        return { data: { lotProducts: [] } };
    }
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(filter)) {
        query.append(key, value);
    }

    const url = `api/customer-service/lots/${lotId}/products?${query.toString()}`;
    const options: AxiosRequestConfig = {
        method: 'get',
        url
    };
    const { data } = await axios(options);
    return data;

};
const selectMasterProduct = (result: MasterProductResponse) => {
    return result.data?.lotProducts?.filter(obj => (obj.activeInactiveInd === "Y")).map(obj => ({
        ...obj,
        label: obj.productNm,
        value: obj.applicableProductId
    })) || [];
};


export const useGetMasterProducts = (lotId: string, filters: MasterProductByProductCdFilter) => {
    return useQuery(
        ['getMasterProducts', lotId, filters],
        () => getMasterProducts(lotId, filters),
        {
            retry: false,
            select: selectMasterProduct
        });
};

const addVehicleAsset = async (countryCode: string, payload: any) => {
    const options: AxiosRequestConfig = {
        method: 'post',
        url: `/api/vehicle-service/vehicle-asset?countryCode=${countryCode}`,
        data: payload
    };
    const { data } = await axios(options);
    return data;
};

export const useAddVehicleAsset = (countryCode: string, onSuccess: any, onError: any) =>
    useMutation((payload: any) =>
        addVehicleAsset(countryCode, payload), {
        onSuccess,
        onError,
        retry: false
    });

interface AssetType {
    assetId: string
    assetNm: string
    activeInactiveInd: "Y" | "N"
}
interface AssetTypeResp {
    data?: {
        assets: AssetType[]
    }
}

//Asset Type Dropdown 
const selectAsset = (result?: AssetTypeResp) => {
    return result?.data?.assets.map(item => ({
        ...item,
        label: item.assetNm,
        value: item.assetId
    })) || [];
};

const getAssetTypes = async (filter: Filter) => {
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(filter)) {
        query.append(key, String(value));
    }
    const options: AxiosRequestConfig = {
        method: 'get',
        url: `/api/product-service/assets?${query.toString()}`
    };
    const { data } = await axios(options);
    return data;
};

export const useGetAssetTypes = (filter: Filter) => {
    return useQuery(
        ["getAssetTypes", filter],
        () => getAssetTypes(filter),
        {
            retry: false,
            select: selectAsset
        }
    );
};
