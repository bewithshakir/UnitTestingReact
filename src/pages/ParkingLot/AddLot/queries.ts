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

export const timeZones = [
    { label: 'UTC (Coordinated Universal Time  -  GMT)', value: 'UTC' },
    { label: 'HST (Hawaii Standard Time  -  GMT-10:00)', value: 'HST' },
    { label: 'AST (Alaska Standard Time  -  GMT-9:00)', value: 'AST' },
    { label: 'PST (Pacific Standard Time  -  GMT-8:00)', value: 'PST' },
    { label: 'MST (Mountain Standard Time  -  GMT-7:00)', value: 'MST' },
    { label: 'CST (Central Standard Time  -  GMT-6:00)', value: 'CST' },
    { label: 'EST (Eastern Standard Time  -  GMT-5:00)', value: 'EST' },
    { label: 'IET (Indiana Eastern Standard Time  -  GMT-5:00)', value: 'IET' },
    { label: 'PNT (Phoenix Standard Time  -  GMT-7:00)', value: 'PNT' }
];

export const productDelFreq = [
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Weekends', value: 'weekends' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Bi-Weekly', value: 'bi-weekly' },
];

export const useGetContactTypes = () => {
    return useQuery(["getContactTypes"], () => getContactTypes());
};

export const useCreateLot = () => {
    return useMutation((payload: any) => createLot(payload));
};
