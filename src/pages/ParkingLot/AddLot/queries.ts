/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from "../../../infrastructure/ApiHelper";

const getContactTypes = async () => {
    const options: AxiosRequestConfig = {
        method: 'get',
        url: '/api/customer-service/contact-type'
    };
    const { data } = await axios(options);
    return data;
};

const createLot = async (payload: any) => {
    const options: AxiosRequestConfig = {
        method: 'post',
        url: '/api/customer-service/lot',
        data: payload,
    };
    const { data } = await axios(options);
    return data;
};

const editParkingLot = async (payload: any, parkingLotId: string) => {
    const options: AxiosRequestConfig = {
        method: 'put',
        url: `api/customer-service/lot/${parkingLotId}`,
        data: payload,
    };
    const { data } = await axios(options);
    return data;
};

const getParkingLotData = async (lotId: string, isTrigger: boolean) => {
    if (lotId != "" && typeof lotId != "undefined") {
        const options: AxiosRequestConfig = {
            method: 'get',
            url: `/api/customer-service/lot/${lotId}?countryCode=us`
        };
        const { data } = await axios(options);
        return data;
    }
};

export const useGetContactTypes = () => {
    return useQuery(["getContactTypes"], () => getContactTypes());
};

export const useCreateLot = (onError:any, onSuccess:any) => {
    return useMutation((payload: any) => createLot(payload), {
        onError,
        onSuccess,
        retry: false,
    });
};

export const useEditParkingLot = (parkingLotId: string, onSuccess: any, onError: any) => {
    return useMutation((payload: any) => editParkingLot(payload, parkingLotId), {
        onSuccess,
        onError,
        retry: false,
    });
};

export const useGetParkingLotData = (lotId: string, isTrigger: boolean, onSuccess: any, onError: any) => {
    return useQuery(["getParkingLot", lotId, isTrigger, onSuccess, onError],
        () => getParkingLotData(lotId, isTrigger), {
        onSuccess,
        onError,
        retry: false
    });
};