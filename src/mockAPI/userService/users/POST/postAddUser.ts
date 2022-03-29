import { DefaultRequestBody, PathParams, ResponseComposition, RestContext, RestRequest } from "msw";
import { PayloadAddUserInt } from '../../../../pages/Users/AddUser/queries';

const postAddUserHandler = (req: RestRequest<DefaultRequestBody, PathParams>, res: ResponseComposition<DefaultRequestBody>, ctx: RestContext) => {
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
};


export default postAddUserHandler;