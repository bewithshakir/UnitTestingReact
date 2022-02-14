import { useMutation } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from "../../../infrastructure/ApiHelper";
import AssetManagementModel from "../../../models/AssetManagementModel";


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