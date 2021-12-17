import { useQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from '../../infrastructure/ApiHelper';


const getStates = async () => {
    const options: AxiosRequestConfig = {
        method: 'get',
        url: '/api/product-service/opis/states?countryCode=us&limit=50&offset=0'
    };
    const { data } = await axios(options);
    return data;
};

export const useGetStates = () => {
    return useQuery(["getStates"], () => getStates());
};

const getCity = async (state: string) => {
    if (state) {
        const options: AxiosRequestConfig = {
            method: 'get',
            url: `/api/product-service/opis/cities?countryCode=us&state=${state}&limit=50&offset=0`
        };
        const { data } = await axios(options);
        return data;
    }
};

export const useGetCity = (state: string) => {
    return useQuery(["getCity", state], () => getCity(state));
};