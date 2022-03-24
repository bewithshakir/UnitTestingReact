import { useMutation, useQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from "../../../infrastructure/ApiHelper";


const addVehicleRule = async (payload: any) => {
    const options: AxiosRequestConfig = {
        method: 'post',
        url: 'api/vehicle-service/vehicle-rules',
        data: payload,
    };
    const { data } = await axios(options);
    return data;
};


export const useAddVehicleRule = (onError: any, onSuccess: any) => {
    return useMutation((payload: any) =>
        addVehicleRule(payload), {
        onError,
        onSuccess,
        retry: false,
    });
};

const editVehicleRule = async (payload: any, ruleId: string) => {
    const options: AxiosRequestConfig = {
        method: 'put',
        url: `api/vehicle-service/vehicle-rules/${ruleId}`,
        data: payload,
    };
    const { data } = await axios(options);
    return data;
};


export const useEditVehicleRule = (ruleId: string, onError: any, onSuccess: any) => {
    return useMutation((payload: any) =>
        editVehicleRule(payload, ruleId), {
        onError,
        onSuccess,
        retry: false,
    });
};

const getVehicleRule = async (ruleId: string) => {
    if (ruleId) {
        const options: AxiosRequestConfig = {
            method: 'get',
            url: `api/vehicle-service/vehicle-rules/${ruleId}?countryCode=us`
        };
        const { data } = await axios(options);
        return data;
    }
};

export const useGetVehicleRule = (ruleId: string, onSuccess: any, onError: any) => {
    return useQuery(["getVehicleRule", ruleId, onSuccess, onError],
        () => getVehicleRule(ruleId), {
        onSuccess,
        onError,
        retry: false
    });
};

