import { DefaultRequestBody, ResponseComposition, RestContext } from "msw";
const lotId = "d0535fcf-de9c-45ca-8a52-c2275710ae23";
const rackUpdateTime = "27-02-2021 7:09 PM";

export const getLots = (res: ResponseComposition<DefaultRequestBody>, ctx: RestContext) => {
    return res(
        ctx.status(200),
        ctx.json({
            data: {
                pagination: {
                    totalCount: 2,
                    limit: 15,
                    offset: 0,
                },
                lots: [
                    {
                        deliveryLocationId: lotId,
                        deliveryLocationNm: 'Barun Demo 5',
                        lotId: '76123456',
                        customerId: '167fd7be-c20e-412a-bac0-502672a055d6',
                        customerName: 'Barun Demo 5',
                        streetAddress:
                            '77 Green Acres Rd S,  Green Acres Rd S,,   Green Acres Rd S, USA',
                        cityNm: 'Valley Stream',
                        stateNm: 'NY',
                        postalCd: '11581',
                        rackUpdate: rackUpdateTime,
                        walletStatus: 'Y',
                        fuelStatus: [
                            {
                                productCd: '0dd5f587-8c6f-40ce-9f77-1616f4b5b842',
                                productNm: 'Barun 1',
                                productIcon: {
                                    productIconCd: 'cdc00914-dbef-4603-89c5-9f18e4af3ccc',
                                    productIconNm: 'Parrot Green',
                                    productIconHexCode: '#BED50F',
                                    activeInactiveInd: 'Y',
                                },
                            },
                            {
                                productCd: '8ee38e73-f9dd-40ca-a53c-49327eab1487',
                                productNm: 'Regular1',
                                productIcon: {
                                    productIconCd: '1bcfe6f1-0fae-4473-a686-82084c8a5030',
                                    productIconNm: 'Aqua',
                                    productIconHexCode: '#89CFDC',
                                    activeInactiveInd: 'Y',
                                },
                            },
                        ],
                        vehicles: 20,
                        primaryContactName: 'Barun Sharma',
                        primaryContactNumber: '9900145505',
                        primaryContactEmail: 'barunshrm@gmail.com',
                    },
                    {
                        cityNm: 'Rajkot',
                        customerId: '6d0f70cc-b976-48f1-8411-f5299fcb8c13',
                        customerName: 'Himanshu ',
                        deliveryLocationId: '88b15c09-2752-4a3e-ac7c-d2e7d9ae4486',
                        deliveryLocationNm: '0786',
                        fuelStatus: ['Regular', 'Premium', 'Diesel'],
                        lotId: '0786123',
                        postalCd: '304803',
                        primaryContactName: 'jasmin dave',
                        rackUpdate: rackUpdateTime,
                        stateNm: 'RJ',
                        streetAddress: 'Rajkot,, Rajkot, India',
                        vehicles: 20,
                        walletStatus: 'Y',
                    },
                    {
                        cityNm: 'Houston',
                        customerId: '76c47070-9031-404c-8f16-7d19f3eb98d4',
                        customerName: 'Barun Time Delivery ',
                        deliveryLocationId: '707892a3-7bcd-40ee-ba4d-06f9f043a6fd',
                        deliveryLocationNm: 'Lance',
                        fuelStatus: ['Regular', 'Premium', 'Diesel'],
                        lotId: '12376542',
                        postalCd: '77007',
                        primaryContactName: 'Barun Sharma',
                        rackUpdate: rackUpdateTime,
                        stateNm: 'TX',
                        streetAddress:
                            '111 Yale St, Washington Avenue Coalition / Memorial Park, Yale St,,  Yale St, USA',
                        vehicles: 20,
                        walletStatus: 'Y',
                    },
                ],
            },
        })
    );
};
