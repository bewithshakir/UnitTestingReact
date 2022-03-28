import { useInfiniteQuery, useQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from "../../infrastructure/ApiHelper";
import { pageDataLimit } from "../../utils/constants";

type FilterParamTypes = string[] | boolean | string | number
interface FilterParams {
    [key: string]: FilterParamTypes
}

const getProductsList = async (pageParam: number, searchTerm: string, sortOrder: { sortBy: string, order: string }, filterParams?: FilterParams) => {
    const query = new URLSearchParams();

    query.append('limit', String(pageDataLimit));
    query.append('offset', String(pageParam));
    query.append('countryCode', 'us');
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
        for (const [key, value] of Object.entries(filterParams)) {
            query.append(key, JSON.stringify(value));
        }
    }

    const url = `/api/product-service/products?${query.toString()}`;
    const options: AxiosRequestConfig = {
        method: 'get',
        url
    };
    const { data } = await axios(options);
    return data;
};


export const ProductsListSet = (query: string, sortOrder: { sortBy: string, order: string }, filterParams?: { [key: string]: string[] }) => {
    return useInfiniteQuery(["getProductsList", query, sortOrder, filterParams], ({ pageParam = 0 }) => getProductsList(pageParam, query, sortOrder, filterParams), {
        getNextPageParam: (lastGroup: any) => {
            if (lastGroup.data.pagination.offset < lastGroup.data.pagination.totalCount) {
                return lastGroup.data.pagination.offset + 15;
            }
        },
        keepPreviousData: true,
        retry: false
    });
};

export const useGetProductList = (query: string, sortOrder: { sortBy: string, order: string }, filterParams?: FilterParams) => {
    return useQuery(['getProductsList', query, sortOrder, filterParams], () => {
        return getProductsList(0, query, sortOrder, filterParams);
    });
};
