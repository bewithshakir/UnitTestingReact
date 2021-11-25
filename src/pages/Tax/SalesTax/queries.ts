/* eslint-disable no-console */
import { useInfiniteQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from "../../../infrastructure/ApiHelper";
import { pageDataLimit } from '../../../utils/constants';

const getSalesTaxList = async (pageParam: number, searchTerm: string, filterParams: { [key: string]: string[] }) => {
    const query = new URLSearchParams();
    if (searchTerm) {
        query.append("search", searchTerm);
    }
    if (filterParams && Object.keys(filterParams).length > 0) {
        for (const key of Object.keys(filterParams)) {
            query.append(key, JSON.stringify(filterParams[key]));
        }
    }
    
    const salesTaxListEntitySet = `/api/tax-service/sales-tax/list?limit=${pageDataLimit}&offset=${pageParam}`;

    const url = query ? `&countryCode=us&${query.toString()}` : `&countryCode=us`;
    const options: AxiosRequestConfig = {
        method: 'get',
        url: salesTaxListEntitySet + url
    };
    const { data } = await axios(options);
    return data;
};

export const salesTaxListSet = (query: string, filterParams: { [key: string]: string[] }) => {
    return useInfiniteQuery(["getSalesTaxList", query, filterParams], ({ pageParam = 0 }) => getSalesTaxList(pageParam, query, filterParams), {
        getNextPageParam: (lastGroup: any) => {
          if(lastGroup.data.pagination.offset < lastGroup.data.pagination.totalCount ){
              return lastGroup.data.pagination.offset + 15;
          }
        },
        keepPreviousData: true
    });
};