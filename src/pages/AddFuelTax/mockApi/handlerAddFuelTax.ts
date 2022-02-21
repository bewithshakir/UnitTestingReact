import { rest } from "msw";

export const getProductTypesDropdownHandler = () => {
    return rest.get('*/api/product-service/products?countryCode=us&skipPagination=true&productGroups=["Fuel", "Non-Fuel"]', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: [
                    {
                        ProductGroup: {
                            activeInactiveInd: "Y",
                            productGroupCd: "0f117f3d-02a8-4d5e-9a97-eb67a66509cf",
                            productGroupNm: "Non-Fuel"
                        },
                        productGroupCd: "0f117f3d-02a8-4d5e-9a97-eb67a66509cf",
                        productGroupNm: "Non-Fuel",
                        ProductIcon: {
                            activeInactiveInd: "Y",
                            productIconCd: "2488eb63-2306-4c92-922c-9a527300024b",
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
                            productGroupCd: "0f117f3d-02a8-4d5e-9a97-eb67a66509cf",
                            productGroupNm: "Non-Fuel"
                        },
                        productGroupCd: "0f117f3d-02a8-4d5e-9a97-eb67a66509cf",
                        productGroupNm: "Non-Fuel",
                        ProductIcon: {
                            activeInactiveInd: "Y",
                            productIconCd: "2488eb63-2306-4c92-922c-9a527300024b",
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
    });
};
