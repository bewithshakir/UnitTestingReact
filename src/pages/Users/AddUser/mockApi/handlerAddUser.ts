import { rest } from "msw";

export const addUserHandler = () => {
    return rest.post('*/api/product-service/assets', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: {
                    shellDigitalAccountId: "12345",
                    customerId: "123",
                    firstNm: "Nikhil",
                    lastNm: "Patel",
                    email: "xyz@gmail.com",
                    permissionTypeCd: "5932",
                    userGroupCd: "555",
                    countryCd: "us",
                    dspId: "01c4"
                },
                error: null
            })
        );
    });
};

export const verifyUserHandler = () => {
    return rest.post('*/api/user-service/users/verification/janrain*', (req, res, ctx) => {
        // const email = req.url.searchParams.get('email');
        // if (email === 'xyz@gmail.com') {
        return res(
            ctx.status(200),
            ctx.json({
                data: {
                    userProfile: {
                        email: "xyz@gmail.com",
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
        // }
    });
};


export const getUserGroupsHandler = () => {
    return rest.get('*/api/user-service/users/user-groups*', (req, res, ctx) => {
        return res(
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
        );
    });
};

export const getCustomerDSPHandler = () => {
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
};

export const getUserPermissionHandler = () => {
    return rest.get('*api/user-service/users/permission-types*', (req, res, ctx) => {
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
};