import { useInfiniteQuery, useQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from "../../infrastructure/ApiHelper"


const getCustomers = async (pageParam: number, searchTerm: string, sortBy: string) => {
    let query = new URLSearchParams()
    if (searchTerm) {
        query.append("search", searchTerm)
    }
    query.append("sortBy", "customerName")
    query.append("order", sortBy)
    const customersEntitySet = `/api/customer-service/customers?limit=15&offset=${pageParam}`
    const url = query ? `&countryCode=us&${query.toString()}` : `&countryCode=us`
    const options: AxiosRequestConfig = {
        method: 'get',
        url: customersEntitySet + url
    }
    const { data } = await axios(options);
    return data;
};
export const useCustomers = (query: string, sortBy: string) => {
    return useInfiniteQuery(["getCustomers", query, sortBy], ({ pageParam = 0 }) => getCustomers(pageParam, query, sortBy), {
        getNextPageParam: (lastGroup: any, allGroups:any) => {
          if(lastGroup.data.pagination.offset < lastGroup.data.pagination.totalCount ){
              return lastGroup.data.pagination.offset + 15
          }
        },
        keepPreviousData: true
    });
}
