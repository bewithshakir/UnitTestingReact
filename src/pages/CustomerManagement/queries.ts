import { useInfiniteQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from "../../infrastructure/ApiHelper";



const getCustomers = async (pageParam: number, searchTerm: string, sortOrder:{sortBy: string,order:string}, filterParams:{[key: string]: string[]}) => {
    const query = new URLSearchParams();
    if (searchTerm) {
        query.append("search", searchTerm);
    }
    query.append("sortBy", sortOrder.sortBy);
    query.append("order", sortOrder.order);
    if(filterParams && Object.keys(filterParams).length > 0){
        for (const key of Object.keys(filterParams)) {
            query.append(key, JSON.stringify(filterParams[key]) );
        }    
    }
    
    const customersEntitySet = `/api/customer-service/customers?limit=15&offset=${pageParam}`;
    const url = query ? `&countryCode=us&${query.toString()}` : `&countryCode=us`;
    const options: AxiosRequestConfig = {
        method: 'get',
        url: customersEntitySet + url
    };
    const { data } = await axios(options);
    return data;
};
export const useCustomers = (query: string, sortOrder:{sortBy: string,order:string}, filterParams:{[key: string]: string[]}) => {
    return useInfiniteQuery(["getCustomers", query, sortOrder, filterParams], ({ pageParam = 0 }) => getCustomers(pageParam, query, sortOrder, filterParams), {
        getNextPageParam: (lastGroup: any) => {
          if(lastGroup.data.pagination.offset < lastGroup.data.pagination.totalCount ){
              return lastGroup.data.pagination.offset + 15;
          }
        },
        keepPreviousData: true
    });
};
