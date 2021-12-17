import { useQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from "../../infrastructure/ApiHelper";

const getProductsList = async () => {
    const productsListEntitySet = `/api/product-service/product/products?countryCode=us`;
    const options: AxiosRequestConfig = {
        method: 'get',
        url: productsListEntitySet
    };
    const { data } = await axios(options);
    
    return data;
};

export const ProductsListSet = (query: string, sortOrder: any, filterParams: { [key: string]: string[] }) => {
    return useQuery(["getProductsList",query,sortOrder,filterParams],()=> getProductsList());
};

