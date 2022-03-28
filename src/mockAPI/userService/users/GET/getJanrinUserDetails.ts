import { DefaultRequestBody, PathParams, ResponseComposition, RestContext, RestRequest } from "msw";

const getJanrinUserDetailsHandler = (req: RestRequest<never, PathParams>, res: ResponseComposition<DefaultRequestBody>, ctx: RestContext) => {
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
};

export default getJanrinUserDetailsHandler;