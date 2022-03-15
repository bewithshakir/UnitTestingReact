import { useInfiniteQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from "../../infrastructure/ApiHelper";
import { pageDataLimit } from '../../utils/constants';

const getTruckList = async (pageParam: number, searchTerm: string, sortOrder: { sortBy: string, order: string }, filterParams?: { [key: string]: string[] }) => {
    const query = new URLSearchParams();
    if (searchTerm) {
        query.append("search", searchTerm);
    }
    if (sortOrder.sortBy.trim()) {
        query.append("sortBy", sortOrder.sortBy);
    }
    if (sortOrder.order.trim()) {
        query.append("order", sortOrder.order);
    }
    if (filterParams && Object.keys(filterParams).length > 0) {
        for (const key of Object.keys(filterParams)) {
            query.append(key, JSON.stringify(filterParams[key]));
        }
    }

    const truckListEntitySet = `/api/truck-service/delivery-vehicles?limit=${pageDataLimit}&offset=${pageParam}`;
    let url = query ? `&countryCode=us${query.toString().length ? `&${query.toString()}` : ''}` : `&countryCode=us`;
    
    let finalUrl = url;

    if(url.includes('&activeInactiveInd=%22Y%22')) {
        finalUrl = url.replace('&activeInactiveInd=%22Y%22', '&activeInactiveInd=Y');
        url  = finalUrl;
    } else if(url.includes('&activeInactiveInd=%22N%22')) {
        finalUrl = url.replace('&activeInactiveInd=%22N%22', '&activeInactiveInd=N');
        url = finalUrl;
    }

    const options: AxiosRequestConfig = {
        method: 'get',
        url: truckListEntitySet + url
    };
    const { data } = await axios(options);
    return data;
};

export const useTruckList = (query: string, sortOrder: { sortBy: string, order: string }, filterParams?: { [key: string]: string[] }) => {
    return useInfiniteQuery(["getTruckList", query, sortOrder, filterParams], ({ pageParam = 0 }) => getTruckList(pageParam, query, sortOrder, filterParams), {
        getNextPageParam: (lastGroup: any) => {
            if (lastGroup.data.pagination.offset < lastGroup.data.pagination.totalCount) {
                return lastGroup.data.pagination.offset + pageDataLimit;
            }
        },
        keepPreviousData: true
    });
};

const getLocationsbyID = async (pageParam: number, deliveryVehicleId: string) => {
    const payload: AxiosRequestConfig = {
        method: 'get',
        url: `/api/truck-service/delivery-vehicles/${deliveryVehicleId}/parking-locations?limit=${pageDataLimit}&offset=${pageParam}&countryCode=us`
    };
    const { data } = await axios(payload);
    return data;
};

export const useGetLocations = (deliveryVehicleId: string) => {
    return useInfiniteQuery(["getLocationsbyID", deliveryVehicleId], ({ pageParam = 0 }) => getLocationsbyID(pageParam, deliveryVehicleId), {
        getNextPageParam: (lastGroup: any) => {
            if (lastGroup.data.pagination.offset < lastGroup.data.pagination.totalCount) {
                return lastGroup.data.pagination.offset + pageDataLimit;
            }
        },
        keepPreviousData: true
    });
};

const getTanksDetailsbyID = async (pageParam: number, deliveryVehicleId: string) => {
    const payload: AxiosRequestConfig = {
        method: 'get',
        url: `/api/truck-service/delivery-vehicles/${deliveryVehicleId}/tanks?limit=${pageDataLimit}&offset=${pageParam}`
    };
    const { data } = await axios(payload);
    return data;
};

export const useGetTanksList = (deliveryVehicleId: string) => {
    return useInfiniteQuery(["getTanksDetailsbyID", deliveryVehicleId], ({ pageParam = 0 }) => getTanksDetailsbyID(pageParam, deliveryVehicleId), {
        getNextPageParam: (lastGroup: any) => {
            if (lastGroup.data.pagination.offset < lastGroup.data.pagination.totalCount) {
                return lastGroup.data.pagination.offset + pageDataLimit;
            }
        },
        keepPreviousData: true
    });
};