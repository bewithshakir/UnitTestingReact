import { useMutation } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from "../../infrastructure/ApiHelper";


const addFuelTax = async (payload: any) => {

    const options: AxiosRequestConfig = {
        method: 'post',
        url: '/api/tax-service/fueltax',
        data: payload,
    };
    const { data } = await axios(options);
    return data;
};

export const useAddFuelTax = () => {
    return useMutation((payload: any) => addFuelTax(payload));
};