import { useInfiniteQuery, useMutation } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from "../../infrastructure/ApiHelper";
import { pageDataLimit } from '../../utils/constants';



const getAttachmentList = async (pageParam: number, searchTerm: string, sortOrder: { sortBy: string, order: string }, filterParams: { [key: string]: string[] }, customerId: string) => {
    console.warn("Search term->", searchTerm);
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
    const customersEntitySet = `/api/customer-service/customers/${customerId}/files?limit=${pageDataLimit}&offset=${pageParam}`;
    const url = query ? `&countryCode=us${query.toString().length ? `&${query.toString()}` : ''}` : `&countryCode=us`;
    const options: AxiosRequestConfig = {
        method: 'get',
        url: customersEntitySet + url
    };
    const { data } = await axios(options);
    return data;
};

export const useAttachmentList = (query: string, sortOrder: { sortBy: string, order: string }, filterParams: { [key: string]: string[] }, customerId: string) => {
    return useInfiniteQuery(["getAttachmentList", query, sortOrder, filterParams], ({ pageParam = 0 }) => getAttachmentList(pageParam, query, sortOrder, filterParams, customerId), {
        getNextPageParam: (lastGroup: any) => {
            if (lastGroup.data.pagination.offset < lastGroup.data.pagination.totalCount) {
                return lastGroup.data.pagination.offset + pageDataLimit;
            }
        },
        keepPreviousData: true
    });
};


const uploadAttachment = async (payload: any, customerId: string) => {
    const options: AxiosRequestConfig = {
        method: 'post',
        url: `/api/customer-service/customers/${customerId}/files`,
        data: payload,
    };

    const { data } = await axios(options);
    return data;
};

export const useUploadAttachment = (customerId: string, onError: any, onSuccess: any) => {
    return useMutation((payload: any) => uploadAttachment(payload, customerId), { onError, onSuccess });
};
