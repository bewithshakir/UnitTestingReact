import { useQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from './ApiHelper';

export type filterURLKey = 'customerFilter' | 'fuelTaxFilter' | 'parkingLotFilter' | 'salesTaxFilter' | 'opisCityFilter' | 'assetFilter'

const filterApis: { [k in filterURLKey]: string } = {
    customerFilter: '/api/customer-service/customers/filterData?countryCode=us',
    fuelTaxFilter: '/api/tax-service/fueltax/filterData?countryCode=us',
    salesTaxFilter: 'api/tax-service/sales-tax/filterData?countryCode=us',
    parkingLotFilter: 'api/customer-service/lot/filter-options?countryCode=us',
    opisCityFilter: 'api/opiscity-service/opiscity/filter-options?countryCode=us',
    assetFilter: 'api/customer-service/lot/filter-options?countryCode=us'
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
