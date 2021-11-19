import { useMutation } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from "../../infrastructure/ApiHelper";


const addSalesTax = async (payload: any) => {

    const options: AxiosRequestConfig = {
        method: 'post',
        url: 'api/tax-service/sales-tax',
        data: payload,
    };
    const { data } = await axios(options);
    return data;
};

export const useAddSalesTax = (onError: any, onSuccess: any) => {
    return useMutation((payload: any) =>
    addSalesTax(payload), {
        onError,
        onSuccess,
        retry: false,
    });
};