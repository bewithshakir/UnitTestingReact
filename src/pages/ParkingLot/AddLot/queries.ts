import { useMutation, useQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from "../../../infrastructure/ApiHelper";

// const getTimeZoneFromAPI = async () => {
//     const options: AxiosRequestConfig = {
//         method: 'get',
//         url: ''
//     };
//     const { data } = await axios(options);
//     return data;
// };

// export const getTimeZone = () => {
//     return useQuery(["getTimeZone"], () => getTimeZoneFromAPI());
// };


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

export const useGetContactTypes = () => {
    return useQuery(["getContactTypes"], () => getContactTypes());
};

export const useCreateLot = () => {
    return useMutation((payload: any) => createLot(payload));
};
