import { useInfiniteQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from "../../infrastructure/ApiHelper";
import { pageDataLimit } from "../../utils/constants";

const getDspList = async (pageParam: number, searchTerm: string, sortOrder: { sortBy: string, order: string }, customerId: string, filterParams?: { [key: string]: string[] }) => {
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

    const opisCityListEntitySet = `/api/customer-service/${customerId}/dsps?limit=${pageDataLimit}&offset=${pageParam}`;
    const url = query ? `&countryCode=us${query.toString().length ? `&${query.toString()}` : ''}` : `&countryCode=us`;
    const options: AxiosRequestConfig = {
        method: 'get',
        url: opisCityListEntitySet + url
    };
    const { data } = await axios(options);
    return data;
};


export const DspListSet = (query: string, sortOrder: { sortBy: string, order: string }, customerId: string, filterParams?: { [key: string]: string[] }) => {
    return useInfiniteQuery(["getDspList", query, sortOrder, filterParams, customerId], ({ pageParam = 0 }) => getDspList(pageParam, query, sortOrder, customerId, filterParams), {
        getNextPageParam: (lastGroup: any) => {
            if (lastGroup.data.pagination.offset < lastGroup.data.pagination.totalCount) {
                return lastGroup.data.pagination.offset + 15;
            }
        },
        keepPreviousData: true
    });
};
