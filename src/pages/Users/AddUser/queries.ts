import { useMutation, useQuery } from "react-query";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "../../../infrastructure/ApiHelper";
import UserModel from "../../../models/UserModel";
import { SettlementTypes, userGroupStr } from '../config';
import _ from "lodash";
import { getCountryCode } from '../../../navigation/utils';

export interface PayloadAddUserInt {
    shellDigitalAccountId: string,
    customerId: string,
    dspId?: string,
    firstNm: string,
    lastNm: string,
    email: string,
    phone?: string,
    permissionTypeCd: string,
    userGroupCd: string
    countryCd: string
}

export interface PayloadEditUserInt {
    customerId: string,
    dspId?: string,
    permissionTypeCd: string,
    userGroupCd: string
    countryCd: string
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
                type: data.userGroupNm === userGroupStr ? SettlementTypes.Voyager :
                    `${SettlementTypes.Internal},${SettlementTypes.WEX},${SettlementTypes.Invoice}`,
            }));
        }
    });
};

async function fetchUserDSPList (customerId: string, countryCode: string) {
    if (customerId) {
        const options: AxiosRequestConfig = {
            method: 'get',
            url: `/api/customer-service/customers/${customerId}/dsps?limit=0&offset=0&skipPagination=true&countryCode=${countryCode}`
        };
        const { data } = await axios(options);
        return data;
    } else {
        return {};
    }
}

export const userGetUserDSPList = (customerId: string, countryCode: string) => {
    return useQuery(["fetchUserDSPList", customerId, countryCode], () => fetchUserDSPList(customerId, countryCode), {
        retry: false,
        select: (response) =>
            response?.data.dsps.map((data: any) => ({
                value: data.id,
                label: data.name,
            })),
    });
};

async function fetchUserDetailsFromJenrin (email: string) {
    if (email) {
        const options: AxiosRequestConfig = {
            method: 'get',
            url: `/api/user-service/users/verification/janrain?email=${email}`
        };
        const { data } = await axios(options);
        return data;
    } else {
        return {};
    }
}

export const useVarifyUser = (email: string, onSuccess?: any, onError?: any) => {
    return useQuery(["fetchUserDetailsFromJenrin", email], () => fetchUserDetailsFromJenrin(email), {
        onError,
        onSuccess,
        retry: false,
    });
};

const addUser = async (payload: UserModel) => {
    const finalPayload: PayloadAddUserInt = {
        shellDigitalAccountId: payload.userId,
        customerId: payload.customerId,
        firstNm: payload.userName.split(' ')[0],
        lastNm: payload.userName.split(' ')[1],
        email: payload.email,
        permissionTypeCd: payload.userAccessLevel,
        userGroupCd: payload.userGroup.value,
        countryCd: payload.countryCd
    };
    if (payload?.dsp?.value) {
        finalPayload.dspId = payload?.dsp?.value;
    }
    if (payload?.phone) {
        finalPayload.phone = payload?.phone;
    }
    const options: AxiosRequestConfig = {
        method: 'post',
        url: `/api/user-service/users`,
        data: finalPayload,
    };
    const { data } = await axios(options);
    return data;
};


export const useAddUser = (onSuccess: any, onError: any) => {
    return useMutation((payload: UserModel) =>
        addUser(payload), {
        onError,
        onSuccess,
        retry: false,
    });
};

const fetchUserDetail = (userId?: string) => {
    const options: AxiosRequestConfig = {
        method: 'get',
        url: `/api/user-service/users/${userId}`
    };
    return axios(options);
};

const isPreUserDetailsExist = (selectedPaymentType = '', userGroupList: any = [], dspList: any = [], userId?: string) => {
    if (selectedPaymentType === SettlementTypes.Voyager) {
        return !!(userId && userGroupList.length && dspList.length);
    }
    return !!(userId && userGroupList.length);
};

export const useGetUserDetails = (selectedPaymentType = '', userGroupList: any = [], dspList: any = [], userId?: string, onSuccess?: any, onError?: any) => {
    return useQuery(['fetchUserDetail', [userId, userGroupList, dspList]],
        () => fetchUserDetail(userId), {
        onSuccess,
        onError,
        enabled: isPreUserDetailsExist(selectedPaymentType, userGroupList, dspList, userId),
        select: (response: AxiosResponse) => {
            const { data } = response.data;
            return {
                userId: data.userId,
                customerId: data.customerId,
                userName: `${data.firstNm} ${data.lastNm}`,
                email: data.email,
                phone: data.phone || '',
                userAccessLevel: data.permissionTypeCd,
                userGroup: _.find(userGroupList, { value: data.userGroupCd }),
                dsp: data.dspId ? _.find(dspList, { value: data.dspId }) : { label: '', value: '' },
                countryCd: getCountryCode()
            };
        },
        retry: false,
    });
};

const updateUserData = async (payload: UserModel, userId?: string) => {
    const finalPayload: PayloadEditUserInt = {
        customerId: payload.customerId,
        permissionTypeCd: payload.userAccessLevel,
        userGroupCd: payload.userGroup.value,
        countryCd: payload.countryCd
    };
    if (payload?.dsp?.value) {
        finalPayload.dspId = payload?.dsp?.value;
    }
    const options: AxiosRequestConfig = {
        method: 'put',
        url: `/api/user-service/users/${userId}`,
        data: finalPayload
    };
    const { data } = await axios(options);
    return data;
};

export const useUpdateUserData = (userId?: string, onSuccess?: any, onError?: any) => {
    return useMutation((payload: UserModel) =>
        updateUserData(payload, userId), {
        onSuccess,
        onError,
        retry: false,
    });
};