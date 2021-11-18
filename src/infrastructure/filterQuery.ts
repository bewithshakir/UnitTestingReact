import { useQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from './ApiHelper';

export type filterURLKey = 'customerFilter' | 'fuelFilter' | 'parkingLogFilter'

const filterApis: { [k in filterURLKey]: string } = {
    customerFilter: '/api/customer-service/customers/filterData?countryCode=us',

    // TODO: need to update once backend API ready
    fuelFilter: '/api/customer-service/customers/filterData?countryCode=us',
    parkingLogFilter: '/api/customer-service/customers/filterData?countryCode=us',
};

const getCustomerFilterData = async (urlKey: filterURLKey) => {
    const options: AxiosRequestConfig = {
        method: 'get',
        url: filterApis[urlKey]
    };
    const { data } = await axios(options);
    return data;
};


export const useGetFilterData = (urlKey: filterURLKey) => {
    return useQuery([urlKey], () => getCustomerFilterData(urlKey));
};
