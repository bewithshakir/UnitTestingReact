import { useMutation } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from "../../../../infrastructure/ApiHelper";

const addTruckParkingLot = async (payload: any) => {

    const options: AxiosRequestConfig = {
        method: 'post',
        url: '/api/truck-service/parking-locations',
        data: payload,  
    };
    const { data } = await axios(options);
    return data;
};

export const useAddTruckParkingLot = (onSuccess: any, onError: any) => {
    return useMutation((payload: any) => addTruckParkingLot(payload),{
        onSuccess,
        onError,
        retry: false
    });
};
