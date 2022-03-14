import { rest } from "msw";
import { PayloadAddUserInt } from '../queries';

export const addUserHandler = () =>
    rest.post('*/api/user-service/users', (req, res, ctx) => {
        const { email } = req.body as PayloadAddUserInt;
        const passedEmail = "xyz@gmail.com";
        return res(
            ctx.status(email === passedEmail ? 200 : 500),
            ctx.json({
                data: email === passedEmail ? {
                    shellDigitalAccountId: "12345",
                    customerId: "123",
                    firstNm: "Nikhil",
                    lastNm: "Patel",
                    email: passedEmail,
                    permissionTypeCd: "5932",
                    userGroupCd: "555",
                    countryCd: "us",
                    dspId: "01c4"
                } : null,
                error: email === passedEmail ? null : {
                    businessCode: 102,
                    details: ["Shell Digital account with given is already added"],
                    httpCode: 500,
                    message: "Shell Digital account with given is already added"
                }
            })
        );
    });


export const verifyUserHandler = () =>
    rest.get('*/api/user-service/users/verification/janrain*', (req, res, ctx) => {
        const email = req.url.searchParams.get('email');
        return res(
            ctx.status(200),
            ctx.json({
                data: {
                    userProfile: {
                        email: email,
                        firstName: "Nikhil",
                        lastName: "Patel",
                        mobile: null,
                        uuid: "12345",
                    },
                    verifiedUser: true
                },
                error: null
            })
        );
    });


export const getUserGroupsHandler = () =>
    rest.get('*/api/user-service/users/user-groups*', (req, res, ctx) =>
        res(
            ctx.status(200),
            ctx.json({
                data: [
                    {
                        activeInactiveInd: "Y",
                        userGroupCd: "444",
                        userGroupNm: "Customer"
                    },
                    {
                        activeInactiveInd: "Y",
                        userGroupCd: "555",
                        userGroupNm: "DSP"
                    }
                ],
                error: null
            })
        )
    );

export function getCustomerDSPHandler () {
    return rest.get('*/api/customer-service/customers/*/dsps*', (req, res, ctx) => {
        const skipPagination = req.url.searchParams.get('skipPagination');
        if (skipPagination) {
            return res(
                ctx.status(200),
                ctx.json({
                    data: {
                        dsps: [
                            {
                                address: "12343 Bonfire Dr",
                                city: "Reisterstown",
                                contactName: "harikrishna",
                                customerId: "123",
                                email: "abc@gmail.com",
                                id: "01c4",
                                lots: [],
                                name: "KrrishTest",
                                postalCode: "21136",
                                state: "MD",
                                totalLotAssigned: 0,
                            },
                        ]
                    },
                    error: null
                })
            );
        }
    });
}

export const getUserPermissionHandler = () =>
    rest.get('*api/user-service/users/permission-types*', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: [
                    {
                        activeInactiveInd: "Y",
                        permissionTypeCd: "5932",
                        permissionTypeNm: "View & Edit",
                    },
                    {
                        activeInactiveInd: "Y",
                        permissionTypeCd: "6500",
                        permissionTypeNm: "View only",
                    }
                ],
                error: null
            })
        );
    });