import { useQuery } from "react-query";
import axios, { AxiosRequestConfig } from "axios";
import { AnyARecord } from "node:dns";

const getCustomers = async () => {
    const options: AxiosRequestConfig = {
        method: 'get',
        url: 'http://20.81.30.168:4001/api/customer-service/customers?limit=15&offset=0&countryCode=us'
    }
    const { data } = await axios(options);
    console.log(data,"gg")
    return data;
};

export const useCustomers = (searchTerm : string)=> {
    return useQuery("getCustomers" ,getCustomers);
}
