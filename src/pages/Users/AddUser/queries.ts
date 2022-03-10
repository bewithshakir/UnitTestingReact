import { useMutation, useQuery } from "react-query";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "../../../infrastructure/ApiHelper";
import UserModel from "../../../models/UserModel";
import { SettlementTypes, userGroupStr } from '../config';

export interface PayloadAddUserInt {
    shellDigitalAccountId: string,
    customerId: string,
    dspId: string,
    firstNm: string,
    lastNm: string,
    email: string,
    phone: string,
    permissionTypeCd: string,
    userGroupCd: string
}
export interface UserGoupsInt {
    activeInactiveInd: string,
    userGroupCd: string,
    userGroupNm: string,
    type: string,
}
export interface UserPermissionInt {
    activeInactiveInd: string,
    permissionTypeCd: string,
    permissionTypeNm: string,
}


const fetchUserPermissionList = async (countryCode: string) => {
    const options: AxiosRequestConfig = {
        method: 'get',
        url: `api/user-service/users/permission-types?countryCode=${countryCode}`
    };
    const { data } = await axios(options);
    return data;
};

export const useGetUserPermissionList = (countryCode: string) => {
    return useQuery(["fetchUserPermissionList", countryCode], () => fetchUserPermissionList(countryCode), {
        retry: false,
        select: (response) => {
            return response?.data.map((data: UserPermissionInt) => ({
                value: data.permissionTypeCd,
                label: data.permissionTypeNm,
                activeInactiveInd: data.activeInactiveInd,
            }));
        }
    });
};

const fetchUserGroupTypes = async (countryCode: string) => {
    const options: AxiosRequestConfig = {
        method: 'get',
        url: `/api/user-service/users/user-groups?countryCode=${countryCode}`
    };
    const { data } = await axios(options);
    return data;
};

export const useGetUserGroupTypes = (countryCode: string) => {
    return useQuery(["fetchUserGroupTypes", countryCode], () => fetchUserGroupTypes(countryCode), {
        retry: false,
        select: (response) => {
            return response?.data.map((data: UserGoupsInt) => ({
                value: data.userGroupCd,
                label: data.userGroupNm,
                activeInactiveInd: data.activeInactiveInd,
                type: data.userGroupNm === userGroupStr ? SettlementTypes.Voyager : "",
            }));
        }
    });
};

const fetchUserDSPList = async (customerId: string, countryCode: string) => {
    if (customerId) {
        const options: AxiosRequestConfig = {
            method: 'get',
            url: `/api/user-service/users/dsp-groups?countryCode=${countryCode}`
        };
        const { data } = await axios(options);
        return data;
    }
};

export const userGetUserDSPList = (customerId: string, countryCode: string) => {
    return useQuery(["fetchUserDSPList", customerId, countryCode], () => fetchUserDSPList(customerId, countryCode), {
        retry: false,
        select: (response) =>
            response?.data.map((data: UserGoupsInt) => ({
                value: data.userGroupCd,
                label: data.userGroupNm,
                activeInactiveInd: data.activeInactiveInd,
                type: data.userGroupNm === userGroupStr ? SettlementTypes.Voyager : "",
            })),
    });
};

const fetchUserDetailsFromJenrin = async (email: string) => {
    if (email) {
        const options: AxiosRequestConfig = {
            method: 'get',
            url: `/api/user-service/users/verification/janrain?email=${email}`
        };
        const { data } = await axios(options);
        return data;
    }
};

export const useVarifyUser = (email: string) => {
    return useQuery(["fetchUserDetailsFromJenrin", email], () => fetchUserDetailsFromJenrin(email), {
        retry: false,
    });
};

const addUser = async (payload: UserModel, jenrinUserData: any) => {
    const finalPayload: PayloadAddUserInt = {
        shellDigitalAccountId: jenrinUserData.shellDigitalAccountId,
        customerId: payload.customerId,
        dspId: payload.dsp.value,
        firstNm: payload.userName.split(' ')[0],
        lastNm: payload.userName.split(' ')[1],
        email: payload.email,
        phone: payload.phone,
        permissionTypeCd: payload.userAccessLevel,
        userGroupCd: payload.userGroup.value
    };
    const options: AxiosRequestConfig = {
        method: 'post',
        url: `/api/user-service/users`,
        data: finalPayload,
    };
    const { data } = await axios(options);
    return data;
};


export const useAddUser = (jenrinUserData: any, onSuccess: any, onError: any) => {
    return useMutation((payload: UserModel) =>
        addUser(payload, jenrinUserData), {
        onError,
        onSuccess,
        retry: false,
    });
};

const fetchUserDetail = (customerId: string | undefined, query: string | undefined,) => {
    const options: AxiosRequestConfig = {
        method: 'get',
        url: `/api/user-service/${customerId}/users/${query}`
    };
    return axios(options);
};

export const useEditUserData = (customerId: string | undefined, query: string | undefined, onSuccess: any, onError: any) => {
    return useQuery(['fetchUserDetail', customerId, query], () => fetchUserDetail(customerId, query), {
        onSuccess,
        onError,
        enabled: !!query,
        select: (response: AxiosResponse) => {
            const { data } = response.data;
            return {
                userName: data.userName,
                contactNm: data.contactName,
                email: data.contactEmailId,
                phone: data.contactPhoneNumber,
            };
        },
        retry: false,
    });
};

const updateUserData = async (payload: UserModel, userId: string) => {
    const finalPayload: PayloadAddUserInt = {
        shellDigitalAccountId: userId,
        customerId: payload.customerId,
        dspId: payload.dsp.value,
        firstNm: payload.userName.split(' ')[0],
        lastNm: payload.userName.split(' ')[1],
        email: payload.email,
        phone: payload.phone,
        permissionTypeCd: payload.userAccessLevel,
        userGroupCd: payload.userGroup.value
    };
    const options: AxiosRequestConfig = {
        method: 'put',
        url: `/api/user-service/users/${userId}`,
        data: finalPayload
    };
    const { data } = await axios(options);
    return data;
};

export const useUpdateUserData = (userId: string, onSuccess: any, onError: any) => {
    return useMutation((payload: UserModel) =>
        updateUserData(payload, userId), {
        onSuccess,
        onError,
        retry: false,
    });
};