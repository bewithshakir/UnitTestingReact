import { useInfiniteQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from "../../infrastructure/ApiHelper";


const getFuelTaxList = async (pageParam: number, searchTerm: string) => {
    const query = new URLSearchParams();
    if (searchTerm) {
        query.append("search", searchTerm);
    }
    
    const fuelTaxListEntitySet = `/api/tax-service/fueltax?limit=15&offset=${pageParam}`;
    const url = query ? `&countryCode=us` : `&countryCode=us`;
    const options: AxiosRequestConfig = {
        method: 'get',
        url: fuelTaxListEntitySet + url
    };
    const { data } = await axios(options);
    return data;
};

export const fuelTaxListSet = (query: string) => {
    return useInfiniteQuery(["getFuelTaxList", query], ({ pageParam = 0 }) => getFuelTaxList(pageParam, query), {
        getNextPageParam: (lastGroup: any) => {
          if(lastGroup.data.pagination.offset < lastGroup.data.pagination.totalCount ){
              return lastGroup.data.pagination.offset + 15;
          }
        },
        keepPreviousData: true
    });
};