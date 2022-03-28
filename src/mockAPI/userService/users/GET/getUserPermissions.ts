import { DefaultRequestBody, ResponseComposition, RestContext } from "msw";

const getUserPermissionHandler = (res: ResponseComposition<DefaultRequestBody>, ctx: RestContext) =>
    res(
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

export default getUserPermissionHandler;