import { DefaultRequestBody, ResponseComposition, RestContext } from "msw";

export const getProductName = (res: ResponseComposition<DefaultRequestBody>, ctx: RestContext) => {
    return res(
        ctx.status(200),
        ctx.json({
            data: [
                {
                    ProductGroup: {
                        activeInactiveInd: "Y",
                        productGroupCd: "11",
                        productGroupNm: "Non-Fuel"
                    },
                    productGroupCd: "22",
                    productGroupNm: "Non-Fuel",
                    ProductIcon: {
                        activeInactiveInd: "Y",
                        productIconCd: "248",
                        productIconHexCode: "#DD1D21",
                        productIconNm: "Red"
                    },
                    productCd: "123",
                    productNm: "Diesel",
                    activeInactiveInd: "Y",
                    countryCode: "us",
                    manualPricing: 0,
                },
                {
                    ProductGroup: {
                        activeInactiveInd: "Y",
                        productGroupCd: "1FuelTax",
                        productGroupNm: "Non-Fuel"
                    },
                    productGroupCd: "21FuelTax",
                    productGroupNm: "Non-Fuel",
                    ProductIcon: {
                        activeInactiveInd: "Y",
                        productIconCd: "249",
                        productIconHexCode: "#DD1D21",
                        productIconNm: "Yellow"
                    },
                    productCd: "456",
                    productNm: "Regular",
                    activeInactiveInd: "Y",
                    countryCode: "us",
                    manualPricing: 0,
                },
            ],
            error: null
        })
    );
}