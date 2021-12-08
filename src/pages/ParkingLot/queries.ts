import { useInfiniteQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from "../../infrastructure/ApiHelper";
import { pageDataLimit } from "../../utils/constants";



const getParkingLotDetails = async (pageParam: number, searchTerm: string, sortOrder: { sortBy: string, order: string }, filterParams: { [key: string]: string[] }, customerId: string) => {
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
    const customersEntitySet = `/api/customer-service/lot/filter?limit=${pageDataLimit}&offset=${pageParam}&customerId=${customerId}`;
    const url = query ? `&countryCode=us${query.toString().length ? `&${query.toString()}` : ''}` : `&countryCode=us`;
    const options: AxiosRequestConfig = {
        method: 'get',
        url: customersEntitySet + url
    };
    const { data } = await axios(options);
    return data;
};
export const useGetParkingLotDetails = (query: string, sortOrder: { sortBy: string, order: string }, filterParams: { [key: string]: string[] }, customerId: string) => {
    return useInfiniteQuery(["getParkingLots", query, sortOrder, filterParams, customerId], ({ pageParam = 0 }) => getParkingLotDetails(pageParam, query, sortOrder, filterParams, customerId), {
        getNextPageParam: (lastGroup: any) => {
            if (lastGroup.data.pagination.offset < lastGroup.data.pagination.totalCount) {
                return lastGroup.data.pagination.offset + pageDataLimit;
            }
        },
        keepPreviousData: true
    });
};
