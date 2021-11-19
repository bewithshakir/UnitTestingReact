import { useInfiniteQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from "../../../infrastructure/ApiHelper";
import { pageDataLimit } from '../../../utils/constants';

const getSalesTaxList = async (pageParam: number, searchTerm: string) => {
    const query = new URLSearchParams();
    if (searchTerm) {
        query.append("search", searchTerm);
    }
    
    const salesTaxListEntitySet = `/api/tax-service/sales-tax/list?limit=${pageDataLimit}&offset=${pageParam}`;

    const url = query ? `&countryCode=us` : `&countryCode=us`;
    const options: AxiosRequestConfig = {
        method: 'get',
        url: salesTaxListEntitySet + url
    };
    const { data } = await axios(options);
    return data;
};

export const salesTaxListSet = (query: string) => {
    return useInfiniteQuery(["getSalesTaxList", query], ({ pageParam = 0 }) => getSalesTaxList(pageParam, query), {
        getNextPageParam: (lastGroup: any) => {
          if(lastGroup.data.pagination.offset < lastGroup.data.pagination.totalCount ){
              return lastGroup.data.pagination.offset + 15;
          }
        },
        keepPreviousData: true
    });
};