import { useInfiniteQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from "../../infrastructure/ApiHelper";
import { pageDataLimit } from "../../utils/constants";



const getCustomers = async (pageParam: number, searchTerm: string, sortOrder: { sortBy: string, order: string }, filterParams: { [key: string]: string[] }) => {
    const query = new URLSearchParams();
    if (searchTerm) {
        query.append("search", searchTerm);
    }
    query.append("sortBy", sortOrder.sortBy);
    query.append("order", sortOrder.order);
    if (filterParams && Object.keys(filterParams).length > 0) {
        for (const key of Object.keys(filterParams)) {
            query.append(key, JSON.stringify(filterParams[key]));
        }
    }

    const customersEntitySet = `/api/customer-service/customers?limit=${pageDataLimit}&offset=${pageParam}`;
    const url = query ? `&countryCode=us&${query.toString()}` : `&countryCode=us`;
    const options: AxiosRequestConfig = {
        method: 'get',
        url: customersEntitySet + url
    };
    const { data } = await axios(options);
    return data;
};
export const useCustomers = (query: string, sortOrder: { sortBy: string, order: string }, filterParams: { [key: string]: string[] }) => {
    return useInfiniteQuery(["getCustomers", query, sortOrder, filterParams], ({ pageParam = 0 }) => getCustomers(pageParam, query, sortOrder, filterParams), {
        getNextPageParam: (lastGroup: any) => {
            if (lastGroup.data.pagination.offset < lastGroup.data.pagination.totalCount) {
                return lastGroup.data.pagination.offset + pageDataLimit;
            }
        },
        keepPreviousData: true
    });
};

// Get Lots by CustomerId
const getLotsByCustomerId = async (pageParam: number, customerId: string) => {
    const payload: AxiosRequestConfig = {
        method: 'get',
        url: `/api/customer-service/lot?limit=${pageDataLimit}&offset=${pageParam}&customerId=${customerId}`
    };
    const { data } = await axios(payload);
    return data;
};

export const getLots = (customerId: string) => {
    return useInfiniteQuery(["getLotsByCustomerId", customerId], ({ pageParam = 0 }) => getLotsByCustomerId(pageParam, customerId), {
        getNextPageParam: (lastGroup: any) => {
            if (lastGroup.data.pagination.offset < lastGroup.data.pagination.totalCount) {
                return lastGroup.data.pagination.offset + pageDataLimit;
            }
        },
        keepPreviousData: true
    });
};