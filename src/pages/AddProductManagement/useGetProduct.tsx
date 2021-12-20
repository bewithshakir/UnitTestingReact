import { AxiosRequestConfig } from "axios";
import axios from "../../infrastructure/ApiHelper";

const getProductData = async (customerId: string, isTrigger: boolean) => {
    if (customerId != "") {
        const options: AxiosRequestConfig = {
            method: 'get',
            url: `/api/customer-service/customers/${customerId}?countryCode=us`
        };
        const { data } = await axios(options);
        return data;
    }
};
