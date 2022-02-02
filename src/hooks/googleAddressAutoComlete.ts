import { AxiosRequestConfig } from "axios";
import axios from "../infrastructure/ApiHelper";
import { useQuery } from "react-query";


const getAddresses = async (searchQuery: string) => {
    if (searchQuery) {
        const payload: AxiosRequestConfig = {
            method: 'get',
            url: `/api/thirdparty-service/addresses/auto-complete?address=${searchQuery}`
        };
        const { data } = await axios(payload);
        return data;
    }
};

export function FetchGoogleAddress (searchQuery: string) {
    return useQuery(["googleAddress", searchQuery], () => getAddresses(searchQuery));
}

const getAddress = async (placeId: string) => {
    if (placeId) {
        const payload: AxiosRequestConfig = {
            method: 'get',
            url: `/api/thirdparty-service/addresses/details?placeId=${placeId}`
        };
        const { data } = await axios(payload);
        return data;
    }
};

export function FetchFormattedAddress (placeId: string) {
    return useQuery(["formattedAddress", placeId], () => getAddress(placeId));
}

