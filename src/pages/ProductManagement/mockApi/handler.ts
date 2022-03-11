import { rest } from "msw";

export const getProductByLotHandler = () => {
    return rest.get('*/api/customer-service/lots/*/products*', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
              "data": {
                "pagination": {
                  "totalCount": 8,
                  "limit": 15,
                  "offset": 0
                },
                "lotProducts": [
                  {
                    "applicableProductId": "155f1447-23d4-4e1f-a3de-1fdd30170083",
                    "deliveryLocationId": "fe193659-fa71-481c-b30f-4d6c82b25e5b",
                    "productId": "9fa85e21-fab8-48d2-af36-85c7686e7666",
                    "productNm": "1 Purple Product Retail",
                    "productColor": {
                      "productIconCd": "a59eac7d-d7fe-4635-805a-dc8e38bfa750",
                      "productIconNm": "Green",
                      "productIconHexCode": "#008443",
                      "activeInactiveInd": "Y"
                    },
                    "pricingModel": {
                      "pricingModelCd": "945d3d8b-57bb-42c8-88a5-2dae9cd230f0",
                      "pricingModelNm": "OPIS Retail",
                      "countryCd": "us",
                      "activeInactiveIndicator": "Y"
                    },
                    "activeInactiveInd": "Y",
                    "opisRackStatus": "Y",
                    "opisProductKey": null
                  },
                  {
                    "applicableProductId": "75593724-17ae-4fa2-876b-4dfb4e82c9b6",
                    "deliveryLocationId": "fe193659-fa71-481c-b30f-4d6c82b25e5b",
                    "productId": "684c58ab-d23c-4591-b9fd-41296c7a394e",
                    "productNm": "Diesel Retail",
                    "productColor": {
                      "productIconCd": "cdc00914-dbef-4603-89c5-9f18e4af3ccc",
                      "productIconNm": "Parrot Green",
                      "productIconHexCode": "#BED50F",
                      "activeInactiveInd": "Y"
                    },
                    "pricingModel": {
                      "pricingModelCd": "945d3d8b-57bb-42c8-88a5-2dae9cd230f0",
                      "pricingModelNm": "OPIS Retail",
                      "countryCd": "us",
                      "activeInactiveIndicator": "Y"
                    },
                    "activeInactiveInd": "Y",
                    "opisRackStatus": "Y",
                    "opisProductKey": null
                  },
                  {
                    "applicableProductId": "480bb3a3-7475-448d-89ad-0eeabaa80a0d",
                    "deliveryLocationId": "fe193659-fa71-481c-b30f-4d6c82b25e5b",
                    "productId": "21f72366-d691-4a5e-b6b7-44089d699f5a",
                    "productNm": "Prod one Retail",
                    "productColor": {
                      "productIconCd": "eb87bb2a-cec7-4b06-b47a-36af04d71a7a",
                      "productIconNm": "Orange",
                      "productIconHexCode": "#EB8705",
                      "activeInactiveInd": "Y"
                    },
                    "pricingModel": {
                      "pricingModelCd": "945d3d8b-57bb-42c8-88a5-2dae9cd230f0",
                      "pricingModelNm": "OPIS Retail",
                      "countryCd": "us",
                      "activeInactiveIndicator": "Y"
                    },
                    "activeInactiveInd": "Y",
                    "opisRackStatus": "Y",
                    "opisProductKey": null
                  },
                  {
                    "applicableProductId": "6ed4ff41-9f3c-4260-83f4-8709c0949068",
                    "deliveryLocationId": "fe193659-fa71-481c-b30f-4d6c82b25e5b",
                    "productId": "684c58ab-d23c-4591-b9fd-41296c7a394e",
                    "productNm": "Product 1",
                    "productColor": {
                      "productIconCd": "cdc00914-dbef-4603-89c5-9f18e4af3ccc",
                      "productIconNm": "Parrot Green",
                      "productIconHexCode": "#BED50F",
                      "activeInactiveInd": "Y"
                    },
                    "pricingModel": {
                      "pricingModelCd": "7c12da5b-3902-4aa6-bcba-dd3c3519afa1",
                      "pricingModelNm": "Custom",
                      "countryCd": "us",
                      "activeInactiveIndicator": "Y"
                    },
                    "activeInactiveInd": "Y",
                    "opisRackStatus": "Y",
                    "opisProductKey": null
                  },
                  {
                    "applicableProductId": "f7732a85-b920-4d2c-8644-4c4ed522132d",
                    "deliveryLocationId": "fe193659-fa71-481c-b30f-4d6c82b25e5b",
                    "productId": "684c58ab-d23c-4591-b9fd-41296c7a394e",
                    "productNm": "Product1",
                    "productColor": {
                      "productIconCd": "cdc00914-dbef-4603-89c5-9f18e4af3ccc",
                      "productIconNm": "Parrot Green",
                      "productIconHexCode": "#BED50F",
                      "activeInactiveInd": "Y"
                    },
                    "pricingModel": {
                      "pricingModelCd": "7f5411c8-ae32-43f6-a05e-146b4d866206",
                      "pricingModelNm": "OPIS Rack",
                      "countryCd": "us",
                      "activeInactiveIndicator": "Y"
                    },
                    "activeInactiveInd": "Y",
                    "opisRackStatus": "N",
                    "opisProductKey": "biodieselb10smeultralowsulno2sr935carson0uno2n-10orportlandsmed"
                  },
                  {
                    "applicableProductId": "b0170ed7-0fb3-4b3d-9e48-3f87715b84af",
                    "deliveryLocationId": "fe193659-fa71-481c-b30f-4d6c82b25e5b",
                    "productId": "8ee38e73-f9dd-40ca-a53c-49327eab1487",
                    "productNm": "Regular Retail",
                    "productColor": {
                      "productIconCd": "1bcfe6f1-0fae-4473-a686-82084c8a5030",
                      "productIconNm": "Aqua",
                      "productIconHexCode": "#89CFDC",
                      "activeInactiveInd": "Y"
                    },
                    "pricingModel": {
                      "pricingModelCd": "945d3d8b-57bb-42c8-88a5-2dae9cd230f0",
                      "pricingModelNm": "OPIS Retail",
                      "countryCd": "us",
                      "activeInactiveIndicator": "Y"
                    },
                    "activeInactiveInd": "Y",
                    "opisRackStatus": "Y",
                    "opisProductKey": null
                  },
                  {
                    "applicableProductId": "d783d7f6-7778-4cd3-a2d6-540e33a2c57e",
                    "deliveryLocationId": "fe193659-fa71-481c-b30f-4d6c82b25e5b",
                    "productId": "9986b9d3-fe75-45a4-b131-9e7e4f1ecfc9",
                    "productNm": "Test Data Model 1 Retail",
                    "productColor": {
                      "productIconCd": "7381a575-7e35-405b-87e5-bbe833010743",
                      "productIconNm": "Yellow",
                      "productIconHexCode": "#FBCE07",
                      "activeInactiveInd": "Y"
                    },
                    "pricingModel": {
                      "pricingModelCd": "945d3d8b-57bb-42c8-88a5-2dae9cd230f0",
                      "pricingModelNm": "OPIS Retail",
                      "countryCd": "us",
                      "activeInactiveIndicator": "Y"
                    },
                    "activeInactiveInd": "Y",
                    "opisRackStatus": "Y",
                    "opisProductKey": null
                  },
                  {
                    "applicableProductId": "a7d76e92-ad4e-48d6-bdff-d2ce15113a0a",
                    "deliveryLocationId": "fe193659-fa71-481c-b30f-4d6c82b25e5b",
                    "productId": "3384bfc4-3c54-45d1-928e-6ba8f584fc3d",
                    "productNm": "Test product 2 Retail",
                    "productColor": {
                      "productIconCd": "2488eb63-2306-4c92-922c-9a527300024b",
                      "productIconNm": "Red",
                      "productIconHexCode": "#DD1D21",
                      "activeInactiveInd": "Y"
                    },
                    "pricingModel": {
                      "pricingModelCd": "945d3d8b-57bb-42c8-88a5-2dae9cd230f0",
                      "pricingModelNm": "OPIS Retail",
                      "countryCd": "us",
                      "activeInactiveIndicator": "Y"
                    },
                    "activeInactiveInd": "Y",
                    "opisRackStatus": "Y",
                    "opisProductKey": null
                  }
                ]
              },
              "error": null
            })
        );
    });
};


export const editProductHandler = () => {
    return rest.put('*/api/customer-service/lots/*/products/*', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                "data": [
                    {
                        "applicableProductId": "e718e6b8-083b-484d-b387-f086e2b29b50",
                        "deliveryLocationId": "c26cc0ab-cbba-414f-a8e5-4a14844ea70b",
                        "pricingCityId": null,
                        "pricingProductId": null,
                        "productNm": "p12-edited",
                        "productCd": "fe29b0ed-1380-4992-9734-ce71ffe76aa6",
                        "pricingModelCd": "7c12da5b-3902-4aa6-bcba-dd3c3519afa1",
                        "opisCityId": null,
                        "manualPriceAmt": 10,
                        "addedPriceAmt": null,
                        "discountPriceAmt": null,
                        "createdDtm": "2022-01-30T17:08:19.310Z",
                        "updatedDtm": "2022-01-31T02:06:09.753Z",
                        "deletedDtm": null,
                        "activeInactiveInd": "Y"
                    }
                ],
                "error": null
            })
        );
    });
};

export const getServedCitiesHandler = () => {
    return rest.get('*/api/product-service/opis/served-cities*', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                "data": {
                  "opisCities": [
                    {
                      "opisServedCityId": "264c5922-f3a9-4883-b109-964df7e4eefe",
                      "city": "Portland",
                      "state": "OR",
                      "cityId": 935,
                      "countryCd": "us"
                    }
                  ]
                },
                "error": null})
        );
    });
};

export const getSupplierBrandProductsHandler = () => {
    return rest.get('*/api/product-service/opis/supplier-brand-products*', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                "data": {
                "supplier": ["Branded Average", "Branded High", "Branded Low", "Cenex", "Citgo", "Murphy", "OPIS Average", "OPIS High", "OPIS Low", "Unbranded Average", "Unbranded High", "Unbranded Low", "XOM"],
                "brand": ["", "b", "u"],
                "actualProduct": ["MID", "NO2", "PRE", "UNL"]
                },
                "error": null
                })
        );
    });
};

export const getSupplierPricesHandler = () => {
    return rest.get('*/api/product-service/opis/rack-prices*', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                "data": {
                  "supplierPrices": [
                    {
                      "productKey": "string",
                      "opisServedCityId": "string",
                      "countryCd": "string",
                      "cityId": 0,
                      "productCategoryId": "string",
                      "generatedProductName": "string",
                      "productIndicator": "string",
                      "productType": "string",
                      "supplier": "string",
                      "state": "string",
                      "city": "string",
                      "brandIndicator": "string",
                      "grossPrice": 0,
                      "octaneValue": 0,
                      "actualProduct": "string",
                      "rvp": "string",
                      "priceDate": "string",
                      "addedDate": "string",
                      "lastUpdatedDate": "string",
                      "terms": "string",
                      "opisProductName": "string",
                      "dieselBlend": "string",
                      "bioType": "string"      }
                  ]
                },
                "error": null})
        );
    });
};

export const getOpisRackProductDetailsHandler = () => {
    return rest.get('*/api/customer-service/lots/*/products/*', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
              "data": {
                "lotProduct": {
                  "applicableProductId": "f7732a85-b920-4d2c-8644-4c4ed522132d",
                  "productNm": "Product1",
                  "manualPriceAmt": 3.241,
                  "addedPriceAmt": null,
                  "discountPriceAmt": null,
                  "totalPricePerGallon": 3.241,
                  "masterProduct": {
                    "productId": "684c58ab-d23c-4591-b9fd-41296c7a394e",
                    "productName": "A Diesel "
                  },
                  "productType": {
                    "productGroupCd": "acad56a6-1e77-4f38-92e5-30a656e786fb",
                    "productGroupNm": "Fuel",
                    "activeInactiveInd": "Y"
                  },
                  "productColor": {
                    "productIconCd": "cdc00914-dbef-4603-89c5-9f18e4af3ccc",
                    "productIconNm": "Parrot Green",
                    "productIconHexCode": "#BED50F",
                    "activeInactiveInd": "Y"
                  },
                  "pricingModel": {
                    "pricingModelCd": "7f5411c8-ae32-43f6-a05e-146b4d866206",
                    "pricingModelNm": "OPIS Rack",
                    "countryCd": "us",
                    "activeInactiveIndicator": "Y"
                  },
                  "opisRackInfo": {
                    "cityId": 935,
                    "supplier": "Carson",
                    "brand": "u",
                    "productKey": "biodieselb10smeultralowsulno2sr935carson0uno2n-10orportlandsmed",
                    "actualProduct": "NO2",
                    "grossPrice": 324.1,
                    "taxExemption": [],
                    "opisProductName": "Biodiesel B10 SME Ultra Low Sul No2"
                  }
                }
              },
              "error": null
            })
        );
    });
};

export const getTaxExemptionsListHandler = () => {
    return rest.get('*/api/tax-service/fuel-taxes/types*', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                "data": [
                  {
                    "taxRateId": "096e95f7-9c23-4bfb-929b-e77c7943c875",
                    "currencyCd": "USD",
                    "taxRateAmt": 13.498,
                    "moneyPctIndicator": "M",
                    "startDate": "2022-01-06T00:00:00.000Z",
                    "endDate": "2025-12-25T00:00:00.000Z",
                    "taxRateTypeNm": "fed-fuel-tax"
                  },
                  {
                    "taxRateId": "0f0ee9b8-f1e4-4bda-8c18-b96c1af575e8",
                    "currencyCd": "USD",
                    "taxRateAmt": 23.44,
                    "moneyPctIndicator": "P",
                    "startDate": "2022-01-06T00:00:00.000Z",
                    "endDate": "2025-12-25T00:00:00.000Z",
                    "taxRateTypeNm": "revenue-fuel-rate"
                  },
                  {
                    "taxRateId": "12e383f6-fdee-49f8-aad3-a24365e27a97",
                    "currencyCd": "USD",
                    "taxRateAmt": 11.345,
                    "moneyPctIndicator": "M",
                    "startDate": "2022-01-06T00:00:00.000Z",
                    "endDate": "2025-12-25T00:00:00.000Z",
                    "taxRateTypeNm": "state-fuel-tax"
                  },
                  {
                    "taxRateId": "277e92bf-2e40-4916-809d-3c89fd0a4af9",
                    "currencyCd": "USD",
                    "taxRateAmt": 3,
                    "moneyPctIndicator": "M",
                    "startDate": "2022-01-06T00:00:00.000Z",
                    "endDate": "2025-12-25T00:00:00.000Z",
                    "taxRateTypeNm": "misc-insp-fuel-tax"
                  },
                  {
                    "taxRateId": "6d02152d-1615-495d-8d91-4df7bba2ecca",
                    "currencyCd": "USD",
                    "taxRateAmt": 3.106,
                    "moneyPctIndicator": "M",
                    "startDate": "2022-01-06T00:00:00.000Z",
                    "endDate": "2025-12-25T00:00:00.000Z",
                    "taxRateTypeNm": "misc-load-fuel-tax"
                  },
                  {
                    "taxRateId": "9190a074-7e95-493b-81e2-45df9250430c",
                    "currencyCd": "USD",
                    "taxRateAmt": 5.245,
                    "moneyPctIndicator": "P",
                    "startDate": "2022-01-06T00:00:00.000Z",
                    "endDate": "2025-12-25T00:00:00.000Z",
                    "taxRateTypeNm": "sales-fuel-rate"
                  },
                  {
                    "taxRateId": "b7d8ea92-9f04-4db6-a51a-ce4bdd387665",
                    "currencyCd": "USD",
                    "taxRateAmt": 5.56,
                    "moneyPctIndicator": "M",
                    "startDate": "2022-01-06T00:00:00.000Z",
                    "endDate": "2025-12-25T00:00:00.000Z",
                    "taxRateTypeNm": "county-fuel-tax"
                  },
                  {
                    "taxRateId": "cf31d197-a8f3-41e4-9ba2-db6ee4b73846",
                    "currencyCd": "USD",
                    "taxRateAmt": 5.101,
                    "moneyPctIndicator": "M",
                    "startDate": "2022-01-06T00:00:00.000Z",
                    "endDate": "2025-12-25T00:00:00.000Z",
                    "taxRateTypeNm": "ppd-sales-tax"
                  },
                  {
                    "taxRateId": "d4755cbe-fe91-4f0c-988b-e70dd8e438fa",
                    "currencyCd": "USD",
                    "taxRateAmt": 4,
                    "moneyPctIndicator": "M",
                    "startDate": "2022-01-06T00:00:00.000Z",
                    "endDate": "2025-12-25T00:00:00.000Z",
                    "taxRateTypeNm": "misc-local-fuel-tax"
                  },
                  {
                    "taxRateId": "dc7f7945-adca-403d-8750-647479c9d40b",
                    "currencyCd": "USD",
                    "taxRateAmt": 1.034,
                    "moneyPctIndicator": "M",
                    "startDate": "2022-01-06T00:00:00.000Z",
                    "endDate": "2025-12-25T00:00:00.000Z",
                    "taxRateTypeNm": "city-fuel-tax"
                  }
                ],
                "error": null
              })
        );
    });
};