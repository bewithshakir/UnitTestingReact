import { useInfiniteQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from "../../infrastructure/ApiHelper";



const getParkingLotDetails= async (pageParam: number, searchTerm: string, sortOrder:{sortBy: string,order:string}, filterParams:{[key: string]: string[]}, customerId: string) => {
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
    
    const customersEntitySet = `/api/customer-service/lot?limit=15&offset=0&customerId=${customerId}`;
    const url = query ? `&countryCode=us&${query.toString()}` : `&countryCode=us`;
    const options: AxiosRequestConfig = {
        method: 'get',
        url: customersEntitySet + url
    };
    const { data } = await axios(options);
    return data;
};
export const useGetParkingLotDetails= (query: string, sortOrder:{sortBy: string,order:string}, filterParams:{[key: string]: string[]}, customerId: string) => {
    return useInfiniteQuery(["getCustomers", query, sortOrder, filterParams, customerId], ({ pageParam = 0 }) => getParkingLotDetails(pageParam, query, sortOrder, filterParams, customerId), {
        getNextPageParam: (lastGroup: any) => {
          if(lastGroup.data.pagination.offset < lastGroup.data.pagination.totalCount ){
              return lastGroup.data.pagination.offset + 15;
          }
        },
        keepPreviousData: true
    });
};
