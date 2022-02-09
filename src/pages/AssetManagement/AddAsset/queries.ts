import { useMutation, useQuery } from "react-query";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "../../../infrastructure/ApiHelper";
import AssetManagementModel from "../../../models/AssetManagementModel";


const addDsp = async (payload: AssetManagementModel) => {
    /* const finalPayload = {
        customerId: payload.customerId,
        dspName : payload.dspName,
        contactName: payload.contactNm,
        contactEmailId: payload.email,
        contactPhoneNumber: payload.phone,
        addressLine1: payload.addressLine1,
        addressLine2: payload.addressLine2,
        cityNm: payload.city,
        stateNm: payload.state,
        postalCd: +payload.postalCode
    };
    const options: AxiosRequestConfig = {
        method: 'post',
        url: `api/customer-service/customers/${payload.customerId}/dsps`,
        data: finalPayload,
    };
    const { data } = await axios(options);
    return data; */

    const payloadData = {
        title: 'foo2',
        body: 'bar2',
        userId: 2,
    }
    
    const { data } = await axios.post('https://jsonplaceholder.typicode.com/posts', payloadData);
    return data;
};

export const useAddAsset = (onSuccess: any, onError: any) => {
    return useMutation((payload: AssetManagementModel) =>
    addDsp(payload), {
        onError,
        onSuccess,
        retry: false,
    });
};