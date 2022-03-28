import { DefaultRequestBody, ResponseComposition, RestContext } from "msw";

const getUserGroupsHandler = (res: ResponseComposition<DefaultRequestBody>, ctx: RestContext) =>
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
    );

export default getUserGroupsHandler;