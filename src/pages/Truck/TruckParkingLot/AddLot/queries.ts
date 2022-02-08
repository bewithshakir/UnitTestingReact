import { useMutation, useQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from "../../../../infrastructure/ApiHelper";
import TruckLotModel from "../../../../models/TruckParkingLotModel";

const addTruckParkingLot = async (payload: any) => {

    const options: AxiosRequestConfig = {
        method: 'post',
        url: '/api/truck-service/parking-locations',
        data: payload,  
    };
    const { data } = await axios(options);
    return data;
};

const getTruckParkingLotData = async (truckParkingId: string) => {
    if (truckParkingId) {
        const options: AxiosRequestConfig = {
            method: 'get',
            url: `/api/truck-service/parking-locations/${truckParkingId}`
        };
        const { data } = await axios(options);
        return data;
    }
};


const editTruckParkingLot = async (payload: TruckLotModel, truckParkingId: string) => {
    const finalPayload = {
        parkingLocationNm: payload.parkingLocationNm,
        addressLine1: payload.addressLine1,
        addressLine2: payload.addressLine2,
        cityNm: payload.cityNm,
        stateNm: payload.stateNm,
        postalCd: payload.postalCd,
        countryCode: payload.countryCode?payload.countryCode: "us"
    };
    const options: AxiosRequestConfig = {
        method: 'put',
        url: `api/truck-service/parking-locations/${truckParkingId}`,
        data: finalPayload
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

export const useGetTruckParkingLotData = (truckParkingId: string, onSuccess: any, onError: any) => {
    return useQuery(["getTruckParkingLot", truckParkingId, onSuccess, onError],
        () => getTruckParkingLotData(truckParkingId), {
        onSuccess,
        onError,
        retry: false
    });
};

export const useEditTruckParkingLot = (truckParkingId: string, onSuccess: any, onError: any) => {
    return useMutation((payload: TruckLotModel) =>
        editTruckParkingLot(payload, truckParkingId), {
        onSuccess,
        onError,
        retry: false
    });
};