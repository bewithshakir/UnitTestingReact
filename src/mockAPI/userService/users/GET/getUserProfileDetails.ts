import { DefaultRequestBody, PathParams, ResponseComposition, RestContext, RestRequest } from "msw";

export const getUserProfileDetailsHandler = (req: RestRequest<never, PathParams>, res: ResponseComposition<DefaultRequestBody>, ctx: RestContext) => {
    const { userId } = req.params;
    return res(
        ctx.status(200),
        ctx.json({
            data: {
                shellDigitalAccountId: "12345",
                customerId: "123",
                firstNm: "Nikhil",
                lastNm: "Patel",
                email: "xyz@gmail.com",
                phone: null,
                permissionTypeCd: "5932",
                userGroupCd: "555",
                dspId: "01c4",
                userId: userId,
            },
            error: null
        })
    );
};


export default getUserProfileDetailsHandler;