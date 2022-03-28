import { DefaultRequestBody, ResponseComposition, RestContext } from "msw";

const getCustomerListHandler = (res: ResponseComposition<DefaultRequestBody>, ctx: RestContext) =>
    res(
        ctx.status(200),
        ctx.json({
            data: {
                pagination: {
                    "totalCount": 1,
                    "limit": 15,
                    "offset": 0
                },
                customers: [
                    {
                        "customerId": "11",
                        "customerInputId": "00123456",
                        "customerName": "jasmin",
                        "contactName": "himanshu mehta",
                        "address": "Rajkot, Rajkot ",
                        "city": "Rajkot",
                        "state": "GJ",
                        "zipCode": "360311",
                        "email": "himanshu.mehta@test.com",
                        "phone": "1234567890",
                        "paymentType": "Invoice",
                        "country": "us",
                        "cardAdded": "N",
                        "totalLots": 1,
                        "createdDate": "03/03/2022"
                    }
                ]
            }
        })
    );

export default getCustomerListHandler;