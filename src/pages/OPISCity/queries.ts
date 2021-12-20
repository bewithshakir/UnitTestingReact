import { useInfiniteQuery, useQuery, useMutation } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from "../../infrastructure/ApiHelper";
import { pageDataLimit } from '../../utils/constants';
import { IAddOPISCity } from './config';

const getStates = async () => {
    const options: AxiosRequestConfig = {
        method: 'get',
        url: '/api/product-service/opis/states?countryCode=us&limit=50&offset=0'
    };
    const { data } = await axios(options);
    return data;
};

export const useGetStates = () => {
    return useQuery(["getStates"], () => getStates());
};

const getCity = async (state: string) => {
    if (state) {
        const options: AxiosRequestConfig = {
            method: 'get',
            url: `/api/product-service/opis/cities?countryCode=us&state=${state}&limit=50&offset=0`
        };
        const { data } = await axios(options);
        return data;
    }
};

export const useGetCity = (state: string) => {
    return useQuery(["getCity", state], () => getCity(state));
};

const getOPISCityList = async (pageParam: number, searchTerm: string, sortOrder: { sortBy: string, order: string }, filterParams?: { [key: string]: string[] }) => {
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

    const opisCityListEntitySet = `/api/opiscity-service/opiscity/list?limit=${pageDataLimit}&offset=${pageParam}`;
    const url = query ? `&countryCode=us${query.toString().length ? `&${query.toString()}` : ''}` : `&countryCode=us`;
    const options: AxiosRequestConfig = {
        method: 'get',
        url: opisCityListEntitySet + url
    };
    const { data } = await axios(options);
    return data;
};

export const useOPISCityList = (query: string, sortOrder: { sortBy: string, order: string }, filterParams?: { [key: string]: string[] }) => {
    return useInfiniteQuery(["getOPISCityList", query, sortOrder, filterParams], ({ pageParam = 0 }) => getOPISCityList(pageParam, query, sortOrder, filterParams), {
        getNextPageParam: (lastGroup: any) => {
            if (lastGroup.data.pagination.offset < lastGroup.data.pagination.totalCount) {
                return lastGroup.data.pagination.offset + 15;
            }
        },
        keepPreviousData: true
    });
};

// Get OPIS-City by Tax OPISCity Id
const getOPISCityByCityId = async (pageParam: number, OPISCityId: string) => {
    const payload: AxiosRequestConfig = {
        method: 'get',
        url: `/api/opiscity-service/opiscity/list/cities?limit=${pageDataLimit}&offset=${pageParam}&opisCityId=${OPISCityId}`
    };
    const { data } = await axios(payload);
    return data;
};

export const getProducts = (OPISCityId: string) => {
    return useInfiniteQuery(["getOPISCityByCityId", OPISCityId], ({ pageParam = 0 }) => getOPISCityByCityId(pageParam, OPISCityId), {
        getNextPageParam: (lastGroup: any) => {
            if (lastGroup.data.pagination.offset < lastGroup.data.pagination.totalCount) {
                return lastGroup.data.pagination.offset + pageDataLimit;
            }
        },
        keepPreviousData: true
    });
};

const addNewCity = async (payload: IAddOPISCity) => {
    const options: AxiosRequestConfig = {
        method: 'post',
        url: '/api/product-service/opis-served-city',
        data: payload,
    };
    const { data } = await axios(options);
    return data;
};

export const useAddCity = (onError: any, onSuccess: any) => {
    return useMutation((payload: IAddOPISCity) => addNewCity(payload), {
        onError,
        onSuccess,
        retry: false,
    });
};