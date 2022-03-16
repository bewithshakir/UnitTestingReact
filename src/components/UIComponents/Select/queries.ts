
import { useQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from "../../../infrastructure/ApiHelper";

interface Payload {
    [k: string]: any
}

// let cancelTokenSoruce: CancelTokenSource | null;

export const getDataFromServer = async (url: string, payload: Payload) => {
    // if (cancelTokenSoruce) {
    //     cancelTokenSoruce.cancel();
    // }
    // cancelTokenSoruce = CancelToken.source();

    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(payload)) {
        query.append(key, value);
    }
    const queryString = query.toString();
    const options: AxiosRequestConfig = {
        method: 'get',
        url: url + (queryString ? `?${queryString}` : ""),
        // cancelToken: cancelTokenSoruce.token
    };
    const { data } = await axios(options);
    // cancelTokenSoruce = null;
    return data;
};

export const useGetDataFromServer = (url: string, payload: Payload, enabled: boolean) => {
    return useQuery([url, payload], () => {
        return getDataFromServer(url, payload);
    }, { enabled });
};

