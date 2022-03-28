import { DefaultRequestBody, PathParams, ResponseComposition, RestContext, RestRequest } from "msw";

const getUserDSPDropdownHandler = (req: RestRequest<never, PathParams>, res: ResponseComposition<DefaultRequestBody>, ctx: RestContext) =>
    res(
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


export default getUserDSPDropdownHandler;