import { useQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from './ApiHelper';


export type filterURLKey = 'customerFilter' | 
'fuelTaxFilter' | 
'parkingLotFilter' | 
'salesTaxFilter' | 
'opisCityFilter' | 
'assetFilter' | 
'parkingLotManagementFilter' | 
'truckParkingLotFilter' | 
'dspFilter' | 
'truckOverviewFilter' | 
'custUserFilter';


const filterApis: { [k in filterURLKey]: string } = {
    customerFilter: '/api/customer-service/customers/filter-options?countryCode=us',
    fuelTaxFilter: '/api/tax-service/fuel-taxes/filter-options?countryCode=us',
    salesTaxFilter: 'api/tax-service/sales-taxes/filter-options?countryCode=us',
    parkingLotFilter: 'api/customer-service/lots/filter-options?countryCode=us',
    opisCityFilter: 'api/product-service/opis/served-cities/filter-options?countryCode=us',
    assetFilter: 'api/customer-service/lots/filter-options?countryCode=us',
    parkingLotManagementFilter: 'api/customer-service/lots/filter-options?countryCode=us',
    truckParkingLotFilter: 'api/truck-service/parking-locations/filter-options?countryCode=us',
    dspFilter: 'dspFilter',
    truckOverviewFilter: 'api/truck-service/delivery-vehicles/filter-options?countryCode=us',
    custUserFilter: 'api/user-service/users/filter-options?countryCode=us'
};

const getCustomerFilterData = async (urlKey: filterURLKey, customerId: string) => {
    let url;
    if (urlKey === 'dspFilter' && customerId) {
        url = `api/customer-service/customers/${customerId}/dsps/filter-options`;
    } else {
        url = filterApis[urlKey];
    }
    const options: AxiosRequestConfig = {
        method: 'get',
        url: url
    };
    const { data } = await axios(options);
    return data;
};

export const useGetFilterData = (urlKey: filterURLKey, customerId: string = '') => {
    return useQuery([urlKey], () => getCustomerFilterData(urlKey, customerId));
};
