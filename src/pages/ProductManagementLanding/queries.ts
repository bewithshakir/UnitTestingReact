import { useQuery } from "react-query";
import { AxiosRequestConfig } from "axios";
import axios from "../../infrastructure/ApiHelper";

const getProductsList = async (searchTerm: string) => {
    const query = new URLSearchParams();
    if (searchTerm) {
        query.append("search", searchTerm);
    }
    const productsListEntitySet = `/api/product-service/product/products?`;
    const url = query ? `&countryCode=us${query.toString().length ? `&${query.toString()}` : ''}` : `&countryCode=us`;

    const options: AxiosRequestConfig = {
        method: 'get',
        url: productsListEntitySet + url
    };
    const { data } = await axios(options);
    
    return data;
};

export const ProductsListSet = (query: string, sortOrder: any, filterParams: { [key: string]: string[] }) => {
    return useQuery(["getProductsList",query,sortOrder,filterParams],()=> getProductsList(query));
};

