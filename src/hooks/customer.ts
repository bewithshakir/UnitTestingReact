import { useQuery } from "react-query";
import axios, { AxiosRequestConfig } from "axios";
import { AnyARecord } from "node:dns";
import { useStore } from "../store";


const getCustomers = async (searchTerm: string,sortBy:string) => {
    const customersEntitySet = "/api/customer-service/customers"
    const url = searchTerm ? `?limit=15&offset=0&countryCode=us&search=${searchTerm}` : `?limit=15&offset=0&countryCode=us`
    const options: AxiosRequestConfig = {
        method: 'get',
        url: customersEntitySet + url
    }
    const { data } = await axios(options);
    console.log(data, "gg")
    return data;
};
export const useCustomers = (query: string,sortBy:string) => {
    //    const query =  useStore(state => state.query)
    return useQuery(["getCustomers", query], () => getCustomers(query,sortBy));
}
