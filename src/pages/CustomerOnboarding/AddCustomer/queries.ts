import { useMutation, useQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from "../../../infrastructure/ApiHelper"


const createCustomer = async (payload: any) => {

    const options: AxiosRequestConfig = {
        method: 'post',
        url: '/api/customer-service/customers?countryCode=us',
        data: payload,
    }
    const { data } = await axios(options);
    return data;
};


const getFrequencies = async () => {
    const options: AxiosRequestConfig = {
        method: 'get',
        url: '/api/customer-service/customers/invoiceFrequency?countryCode=us'
    }
    const { data } = await axios(options);
    return data;
};

const getPaymentTypes = async () => {
    const options: AxiosRequestConfig = {
        method: 'get',
        url: '/api/customer-service/customers/paymentType?countryCode=us'
    }
    const { data } = await axios(options);
    return data;
};


export const useGetFrequencies = () => {
    return useQuery(["getFrequencies"], () => getFrequencies());
}

export const useGetPaymentTypes = () => {
    return useQuery(["getCustomers"], () => getPaymentTypes());
}


export const useCreateCustomer = () => {
    return useMutation((payload: any) => createCustomer(payload))
};