import { useMutation } from "react-query";
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