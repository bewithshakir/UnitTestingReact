import { DefaultRequestBody, PathParams, ResponseComposition, RestContext, RestRequest } from "msw";

const putEditUserHandler = (req: RestRequest<DefaultRequestBody, PathParams>, res: ResponseComposition<DefaultRequestBody>, ctx: RestContext) => {
    const { userId } = req.params;
    const testUserId = "test1234";
    return res(
        ctx.status(userId === testUserId ? 200 : 500),
        ctx.json({
            data: userId === testUserId ? {
                shellDigitalAccountId: "12345",
                customerId: "123",
                firstNm: "Nikhil",
                lastNm: "Patel",
                email: "xyz@gmail.com",
                permissionTypeCd: "5932",
                userGroupCd: "555",
                countryCd: "us",
                dspId: "01c4",
                userId: testUserId
            } : null,
            error: userId === testUserId ? null : {
                businessCode: 102,
                details: ["Edit User Operation failed"],
                httpCode: 500,
                message: "Edit User Operation failed"
            }
        })
    );
};


export default putEditUserHandler;