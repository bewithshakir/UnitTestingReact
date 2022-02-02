import { useInfiniteQuery } from "react-query";
import { AxiosRequestConfig } from "axios";

import axios from "../../../infrastructure/ApiHelper";
import { pageDataLimit } from "../../../utils/constants";



const fetchTruckParkingLotList = async (pageParam: number, searchTerm: string, sortOrder: { sortBy: string, order: string }, filterParams?: { [key: string]: string[] }) => {
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

    const fuelTaxListEntitySet = `/api/truck-service/parking-locations/?countryCode=us&limit=${pageDataLimit}&offset=${pageParam}`;
    const options: AxiosRequestConfig = {
        method: 'get',
        url: fuelTaxListEntitySet
    };
    const { data } = await axios(options);
    return data;
};
export const useGetTruckParkingLotList = (query: string, sortOrder: { sortBy: string, order: string }, filterParams?: { [key: string]: string[] }) => {
    return useInfiniteQuery(["getFuelTaxList", query, sortOrder, filterParams], ({ pageParam = 0 }) => fetchTruckParkingLotList(pageParam, query, sortOrder, filterParams), {
        getNextPageParam: (lastGroup: any) => {
            if (lastGroup.data.pagination.offset < lastGroup.data.pagination.totalCount) {
                return lastGroup.data.pagination.offset + pageDataLimit;
            }
        },
        keepPreviousData: true,
        retry: false
    });
};
