import { rest } from "msw";

export const getProductByLotHandler = () => {
    return rest.get('*/api/customer-service/lots/*/products*', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: {
                    pagination: {
                        "totalCount": 4,
                        "limit": 15,
                        "offset": 0
                    },
                    lotProducts: [
                        {
                            "applicableProductId": "458b8e0b-a305-4a34-bbca-985703dbf56b",
                            "deliveryLocationId": "3916b833-4c0c-4e9f-bd16-39c327dae66e",
                            "productId": "35c92ec4-83db-401e-b43e-587668022764",
                            "productNm": "regular-custom",
                            "productColor": {
                                "productIconCd": "012711bf-dd95-4458-a6ec-9a3f30207022",
                                "productIconNm": "Orange",
                                "productIconHexCode": "#EB8705",
                                "activeInactiveInd": "Y"
                            },
                            "pricingModel": {
                                "pricingModelCd": "34cb0599-a8e4-4023-afed-4d705ac1375c",
                                "pricingModelNm": "Custom",
                                "countryCd": "us",
                                "activeInactiveIndicator": "Y"
                            },
                            "activeInactiveInd": "Y"
                        },
                        {
                            "applicableProductId": "e0ebcabd-5c97-4fd9-be5b-21ec5b3a7b98",
                            "deliveryLocationId": "3916b833-4c0c-4e9f-bd16-39c327dae66e",
                            "productId": "35c92ec4-83db-401e-b43e-587668022764",
                            "productNm": "regular-custom2",
                            "productColor": {
                                "productIconCd": "012711bf-dd95-4458-a6ec-9a3f30207022",
                                "productIconNm": "Orange",
                                "productIconHexCode": "#EB8705",
                                "activeInactiveInd": "Y"
                            },
                            "pricingModel": {
                                "pricingModelCd": "34cb0599-a8e4-4023-afed-4d705ac1375c",
                                "pricingModelNm": "Custom",
                                "countryCd": "us",
                                "activeInactiveIndicator": "Y"
                            },
                            "activeInactiveInd": "Y"
                        },
                        {
                            "applicableProductId": "16300452-7c3d-4ad7-baca-d307fac6e921",
                            "deliveryLocationId": "3916b833-4c0c-4e9f-bd16-39c327dae66e",
                            "productId": "35c92ec4-83db-401e-b43e-587668022764",
                            "productNm": "regular-custom3",
                            "productColor": {
                                "productIconCd": "012711bf-dd95-4458-a6ec-9a3f30207022",
                                "productIconNm": "Orange",
                                "productIconHexCode": "#EB8705",
                                "activeInactiveInd": "Y"
                            },
                            "pricingModel": {
                                "pricingModelCd": "34cb0599-a8e4-4023-afed-4d705ac1375c",
                                "pricingModelNm": "Custom",
                                "countryCd": "us",
                                "activeInactiveIndicator": "Y"
                            },
                            "activeInactiveInd": "Y"
                        },
                        {
                            "applicableProductId": "06a74424-d20c-464e-a76c-4e6858481557",
                            "deliveryLocationId": "3916b833-4c0c-4e9f-bd16-39c327dae66e",
                            "productId": "35c92ec4-83db-401e-b43e-587668022764",
                            "productNm": "regular-custom4",
                            "productColor": {
                                "productIconCd": "012711bf-dd95-4458-a6ec-9a3f30207022",
                                "productIconNm": "Orange",
                                "productIconHexCode": "#EB8705",
                                "activeInactiveInd": "Y"
                            },
                            "pricingModel": {
                                "pricingModelCd": "34cb0599-a8e4-4023-afed-4d705ac1375c",
                                "pricingModelNm": "Custom",
                                "countryCd": "us",
                                "activeInactiveIndicator": "Y"
                            },
                            "activeInactiveInd": "Y"
                        }
                    ]
                },
                error: null
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
                      "opisServedCityId": "0b3ab3eb-8bac-43cc-83f1-213206c79e92",
                      "city": "Fairbanks",
                      "state": "AK",
                      "cityId": 886,
                      "countryCd": "us"      }
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
                    "applicableProductId": "66baa5ec-b9f0-4081-bb01-e6775f4e0922",
                    "productNm": "p15",
                    "manualPriceAmt": 2.923,
                    "addedPriceAmt": null,
                    "discountPriceAmt": null,
                    "totalPricePerGallon": 2.923,
                    "masterProduct": {
                      "productId": "684c58ab-d23c-4591-b9fd-41296c7a394e",
                      "productName": "Diesel "
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
                      "cityId": 270,
                      "supplier": "Apex",
                      "brand": "u",
                      "productKey": "ulsdwinterred#2dg270apex0uno2n-10iabettendorf",
                      "actualProduct": "NO2",
                      "grossPrice": 292.32,
                      "taxExemption": [
                        "36b5334a-22eb-45ec-8352-8c151c171b64"
                      ],
                      "opisProductName": "ULSD Winter Red #2"
                    }
                  }
                },
                "error": null
              })
        );
    });
};

export const getProductsHandler = () => {
  return rest.get('*/api/customer-service/lots/*/products*', (req, res, ctx) => {
      return res(
          ctx.status(200),
          ctx.json({
              "data": {
                "lotProduct": {
                  "applicableProductId": "66baa5ec-b9f0-4081-bb01-e6775f4e0922",
                  "productNm": "p15",
                  "manualPriceAmt": 2.923,
                  "addedPriceAmt": null,
                  "discountPriceAmt": null,
                  "totalPricePerGallon": 2.923,
                  "masterProduct": {
                    "productId": "684c58ab-d23c-4591-b9fd-41296c7a394e",
                    "productName": "Diesel "
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
                    "cityId": 270,
                    "supplier": "Apex",
                    "brand": "u",
                    "productKey": "ulsdwinterred#2dg270apex0uno2n-10iabettendorf",
                    "actualProduct": "NO2",
                    "grossPrice": 292.32,
                    "taxExemption": [
                      "36b5334a-22eb-45ec-8352-8c151c171b64"
                    ],
                    "opisProductName": "ULSD Winter Red #2"
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