import { useQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from './ApiHelper';

export type filterURLKey = 'customerFilter' | 'fuelTaxFilter' | 'parkingLotFilter' | 'salesTaxFilter' | 'opisCityFilter' | 'assetFilter' | 'parkingLotManagementFilter' | 'truckParkingLotFilter'

const filterApis: { [k in filterURLKey]: string } = {
    customerFilter: '/api/customer-service/customers/filter-options?countryCode=us',
    fuelTaxFilter: '/api/tax-service/fuel-taxes/filter-options?countryCode=us',
    salesTaxFilter: 'api/tax-service/sales-taxes/filter-options?countryCode=us',
    parkingLotFilter: 'api/customer-service/lots/filter-options?countryCode=us',
    opisCityFilter: 'api/product-service/opis/served-cities/filter-options?countryCode=us',
    assetFilter: 'api/customer-service/lots/filter-options?countryCode=us',
    parkingLotManagementFilter: 'api/customer-service/lots/filter-options?countryCode=us',
    truckParkingLotFilter: 'api/truck-service/parking-locations/filter-options?countryCode=us'
};

const getCustomerFilterData = async (urlKey: filterURLKey) => {
    const options: AxiosRequestConfig = {
        method: 'get',
        url: filterApis[urlKey]
    };
    const { data } = await axios(options);
    return data;
};

const getCustomerNameData = async () => {
    const options: AxiosRequestConfig = {
        method: 'get',
        url: '/api/customer-service/customers?limit=15&offset=0&countryCode=us&sortBy=customerName&order=desc&'
    };
    const { data } = await axios(options);
    return data;
};

export const useGetCustomerNameData = () => {
    return useQuery([], () => getCustomerNameData());
};


export const useGetFilterData = (urlKey: filterURLKey) => {
    return useQuery([urlKey], () => getCustomerFilterData(urlKey));
};
