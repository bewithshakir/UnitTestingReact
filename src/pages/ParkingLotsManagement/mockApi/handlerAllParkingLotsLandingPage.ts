import { rest } from "msw";

export const getAllParkingLotsHandler = () => {
    return rest.get('*/api/customer-service/lot/*', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: [
                    {
                        "cityNm": "Rajkot",
                        "customerId": "6d0f70cc-b976-48f1-8411-f5299fcb8c13",
                        "customerName": "Himanshu ",
                        "deliveryLocationId": "88b15c09-2752-4a3e-ac7c-d2e7d9ae4486",
                        "deliveryLocationNm": "0786",
                        "fuelStatus": ["Regular", "Premium", "Diesel"],
                        "lotId": "0786123",
                        "postalCd": "304803",
                        "primaryContactName": "jasmin dave",
                        "rackUpdate": "27-02-2021 7:09 PM",
                        "stateNm": "RJ",
                        "streetAddress": "Rajkot,, Rajkot, India",
                        "vehicles": 20,
                        "walletStatus": "Y",
                    },
                    {
                        "cityNm": "Houston",
                        "customerId": "76c47070-9031-404c-8f16-7d19f3eb98d4",
                        "customerName": "Barun Time Delivery ",
                        "deliveryLocationId": "707892a3-7bcd-40ee-ba4d-06f9f043a6fd",
                        "deliveryLocationNm": "Lance",
                        "fuelStatus": ["Regular", "Premium", "Diesel"],
                        "lotId": "12376542",
                        "postalCd": "77007",
                        "primaryContactName": "Barun Sharma",
                        "rackUpdate": "27-02-2021 7:09 PM",
                        "stateNm": "TX",
                        "streetAddress": "111 Yale St, Washington Avenue Coalition / Memorial Park, Yale St,,  Yale St, USA",
                        "vehicles": 20,
                        "walletStatus": "Y",
                    }
                ]
            })
        );
    });
};