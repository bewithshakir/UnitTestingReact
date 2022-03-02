/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from "../../../infrastructure/ApiHelper";

const createTruck = async (payload: any) => {

    const options: AxiosRequestConfig = {
        method: 'post',
        url: '/api/truck-service/delivery-vehicles',
        data: payload,
    };
    const { data } = await axios(options);
    return data;
};


export const useCreateTruck = (onError: any, onSuccess: any) => {
    return useMutation((payload: any) =>
        createTruck(payload), {
        onError,
        onSuccess,
        retry: false,
    });
};


const fetchFuelTypeList = async () => {
    const options: AxiosRequestConfig = {
        method: 'get',
        url: '/api/product-service/products?countryCode=us&skipPagination=true&productGroups=["Fuel", "Non-Fuel"]'
    };
    const { data } = await axios(options);
    return data;
};

interface FuelType {
    productNm: string
    productCd: string
    activeInactiveInd: string
}

export const useGetFuelTypeList = () => {
    return useQuery(['fetchFuelTypeList'], () => fetchFuelTypeList(), {
        retry: false,
        select: (response) => {
            const fuelTypeList = response?.data.filter((obj: FuelType) => obj.activeInactiveInd === "Y")
                .map((data: FuelType) => ({
                    value: data.productCd.trim(),
                    label: data.productNm.trim(),
                }));
            return fuelTypeList;
        }
    });
};




const fetchTruckParkingList = async () => {
    const options: AxiosRequestConfig = {
        method: 'get',
        url: '/api/truck-service/parking-locations?countryCode=us&limit=100&offset=0'
    };
    const { data } = await axios(options);
    return data;
};

interface TruckNameList {
    id: string
    name: string
    state: string
}

export const useGetTruckParkingList = () => {
    return useQuery(['fetchTruckParkingList'], () => fetchTruckParkingList(), {
        retry: false,
        select: (response) => {
            const fuelTruckParkingList = response?.data.parkingLocations
                .map((data: TruckNameList) => ({
                    value: data.id.trim(),
                    label: data.name.trim(),
                    state: data.state.trim()
                }));
            return fuelTruckParkingList;
        }
    });
};


const fetchTruckColorList = async () => {
    const options: AxiosRequestConfig = {
        method: 'get',
        url: '/api/truck-service/colors'
    };
    const { data } = await axios(options);
    return data;
};

interface TruckColorList {
    colorCd: string
    colorNm: string
}

export const useTruckColor = () => {
    return useQuery(['fetchTruckColorList'], () => fetchTruckColorList(), {
        retry: false,
        select: (response) => {
            const fuelTruckParkingList = response?.data.colors
                .map((data: TruckColorList) => ({
                    value: data.colorCd.trim(),
                    label: data.colorNm.trim(),
                }));
            return fuelTruckParkingList;
        }
    });
};



const fetchTruckDetails = async (query: any) => {
    const options: AxiosRequestConfig = {
        method: 'get',
        url: `/api/truck-service/delivery-vehicles/${query}`
    };
    return axios(options);
};

export const useGetEditTruckDetails = (query: any, onSuccess?: any, onError?: any) => {
    return useQuery(['fetchTruckDetails', query], () => fetchTruckDetails(query), {
        onSuccess,
        onError,
        enabled: !!query,
        retry: false,
    });
};

const editTruck = async (payload: any, deliveryVehicleId: string) => {

    const options: AxiosRequestConfig = {
        method: 'put',
        url: `/api/truck-service/delivery-vehicles/${deliveryVehicleId}`,
        data: payload,
    };
    const { data } = await axios(options);
    return data;
};

export const useEditTruckDetails = (deliveryVehicleId: string, onSuccess: any, onError: any) => {
    return useMutation((payload: any) =>
        editTruck(payload, deliveryVehicleId), {
        onSuccess,
        onError,
        retry: false,
    });
};
