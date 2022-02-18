import { useMutation, useQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from "../../../infrastructure/ApiHelper";
import AssetManagementModel from "../../../models/AssetManagementModel";


// ------------- Add Asset Details -------------

const addAsset = async (payload: AssetManagementModel) => {
    const finalPayload = {
        countryCode: "us",
        assetNm: payload.assetType,
        activeInactiveInd: payload.assetStatus?.value
    };
    const options: AxiosRequestConfig = {
        method: 'post',
        url: `api/product-service/assets`,
        data: finalPayload,
    };
    const { data } = await axios(options);
    return data;
};

export const useAddAsset = (onSuccess: any, onError: any) => {
    return useMutation((payload: AssetManagementModel) =>
        addAsset(payload), {
        onError,
        onSuccess,
        retry: false,
    });
};



// ------------- Edit Asset Details By Asset-Id -------------

const editAsset = async (payload: AssetManagementModel, assetId: string) => {
    const finalPayload = {
        countryCode: "us",
        assetNm: payload.assetType,
        activeInactiveInd: payload.assetStatus?.value
    };
    const options: AxiosRequestConfig = {
        method: 'put',
        url: `api/product-service/assets/${assetId}`,
        data: finalPayload,
    };
    const { data } = await axios(options);
    return data;
};

export const useEditAsset = (assetId: string, onSuccess: any, onError: any) => {
    return useMutation((payload: AssetManagementModel) =>
        editAsset(payload, assetId), {
        onError,
        onSuccess,
        retry: false,
    });
};


// ------------- Get Asset Details By Asset-Id -------------

const getAssetDetails = async (assetId: string) => {
    if (assetId) {
        const options: AxiosRequestConfig = {
            method: 'get',
            url: `/api/product-service/assets/${assetId}`
        };
        const { data } = await axios(options);
        return data;
    }
};

export const useGetAssetDetails = (assetId: string, onSuccess: any, onError: any) => {
    return useQuery(["getAssetDetails", assetId, onSuccess, onError],
        () => getAssetDetails(assetId), {
        onSuccess,
        onError,
        retry: false
    });
};
