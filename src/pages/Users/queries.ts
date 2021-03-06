import { useInfiniteQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from "../../infrastructure/ApiHelper";
import { pageDataLimit } from "../../utils/constants";

function getQueryStr (query: any) {
    if (query) {
        if (query.toString().length) {
            return `&countryCode=us&${query.toString()}`;
        }
        return '&countryCode=us';

    }
    return '&countryCode=us';
}

const getUsersList = async (pageParam: number,
    searchTerm: string,
    sortOrder: { sortBy: string, order: string },
    customerId: string, filterParams?: { [key: string]: string[] }) => {
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

    const usersGetListEntitySet = `/api/user-service/users?limit=${pageDataLimit}&offset=${pageParam}&customerId=${customerId}`;

    const url = getQueryStr(query);

    const options: AxiosRequestConfig = {
        method: 'get',
        url: usersGetListEntitySet + url
    };
    const { data } = await axios(options);
    return data;
};


export const useGetUsersList = (query: string, sortOrder: { sortBy: string, order: string }, customerId: string, filterParams?: { [key: string]: string[] }) => {
    return useInfiniteQuery(["getUsersList", query,
        sortOrder,
        filterParams,
        customerId], ({ pageParam = 0 }) => getUsersList(pageParam, query, sortOrder, customerId, filterParams), {
        getNextPageParam: function (lastGroup: any) {
            if (lastGroup.data.pagination.offset < lastGroup.data.pagination.totalCount) {
                return lastGroup.data.pagination.offset + 15;
            }
            return lastGroup.data.pagination.offset;
        },
        keepPreviousData: true
    });
};
