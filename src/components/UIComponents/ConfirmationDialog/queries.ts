
import { AxiosRequestConfig } from "axios";
import { useQuery } from "react-query";
import axios from "../../../infrastructure/ApiHelper";
interface Payload {
    [k: string]: any
}
const getFilterData = async (url: string, payload: Payload) => {
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(payload)) {
        query.append(key, value);
    }
    const queryString = query.toString();
    const options: AxiosRequestConfig = {
        method: 'get',
        url: url + (queryString ? `?${queryString}` : ""),
    };
    const { data } = await axios(options);
    return data;
};

export const useGetFilterData = (url: string, payload: Payload) => {
    return useQuery([url, payload], () => {
        return getFilterData(url, payload);
    });
};

