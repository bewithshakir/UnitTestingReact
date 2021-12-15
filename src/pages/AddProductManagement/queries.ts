import { useQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from '../../infrastructure/ApiHelper';

const getProductTypes = async () => {
    const options: AxiosRequestConfig = {
        method: 'get',
        url: '/api/product-service/product/productType?countryCode=us'
    };
    const { data } = await axios(options);
    return data;
};

export const useGetProductTypes = () => {
    return useQuery(["getProductTypes"], () => getProductTypes());
};