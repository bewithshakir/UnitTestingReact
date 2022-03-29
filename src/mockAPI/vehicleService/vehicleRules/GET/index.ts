import { rest } from "msw";

const productGroupCd = "acad56a6-1e77-4f38-92e5-30a656e786fb";
const productIconNm = "Parrot Green";
const productIconCd = "f5f52aa5-9a03-4ea5-8885-d872151b819d";
const productIconCd2 = "cdc00914-dbef-4603-89c5-9f18e4af3ccc";
const productCd = "0dd5f587-8c6f-40ce-9f77-1616f4b5b842";
export const getVehicleRules = () => {
    return rest.get('*/api/vehicle-service/vehicle-rules', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: {
                    pagination: { totalCount: 32, limit: 0, offset: 0 },
                    vehicleRules: [{
                        "ruleId": "e65a30b9-5983-4a78-b900-4e63156e356a",
                        "city": "Culpeper",
                        "state": "VA",
                        "countryCode": "us",
                        "yearNo": 2009,
                        "activeInactiveInd": "Y",
                        "vehicleRuleProducts": [{
                            "ruleExceptionId": "4c242d2f-0834-482e-990e-5064d5d001a3",
                            "productCd": "305a47f9-d29d-476a-bd5e-a8c15830a3b3",
                            "activeInactiveInd": "Y",
                            "productInfo": {
                                "productCd": "305a47f9-d29d-476a-bd5e-a8c15830a3b3",
                                "productNm": "Regular-Ethanol 12",
                                "activeInactiveInd": "N",
                                "manualPricing": 0,
                                "countryCode": "us",
                                "productGroup": {
                                    "productGroupCd": productGroupCd,
                                    "productGroupNm": "Fuel",
                                    "activeInactiveInd": "Y"
                                },
                                "productIcon": {
                                    "productIconCd": productIconCd,
                                    "productIconNm": "Brown",
                                    "productIconHexCode": "#743410",
                                    "activeInactiveInd": "Y"
                                }
                            }
                        }, {
                            "ruleExceptionId": "7f112592-45b2-424a-86dd-6c5f4e00866f",
                            "productCd": "1fca4cbb-e592-4073-96d8-0e3e83fd48b4",
                            "activeInactiveInd": "Y",
                            "productInfo": {
                                "productCd": "1fca4cbb-e592-4073-96d8-0e3e83fd48b4",
                                "productNm": "Premium444",
                                "activeInactiveInd": "N",
                                "manualPricing": 0,
                                "countryCode": "us",
                                "productGroup": {
                                    "productGroupCd": productGroupCd,
                                    "productGroupNm": "Fuel",
                                    "activeInactiveInd": "Y"
                                },
                                "productIcon": {
                                    "productIconCd": productIconCd,
                                    "productIconNm": "Brown",
                                    "productIconHexCode": "#743410",
                                    "activeInactiveInd": "Y"
                                }
                            }
                        }, {
                            "ruleExceptionId": "8f556264-06f0-4d85-b2e5-191dfb0869a8",
                            "productCd": productCd,
                            "activeInactiveInd": "Y",
                            "productInfo": {
                                "productCd": productCd,
                                "productNm": "Barun 1",
                                "activeInactiveInd": "N",
                                "manualPricing": 0,
                                "countryCode": "us",
                                "productGroup": {
                                    "productGroupCd": productGroupCd,
                                    "productGroupNm": "Fuel",
                                    "activeInactiveInd": "Y"
                                },
                                "productIcon": {
                                    "productIconCd": productIconCd2,
                                    "productIconNm": productIconNm,
                                    "productIconHexCode": "#BED50F",
                                    "activeInactiveInd": "Y"
                                }
                            }
                        }, {
                            "ruleExceptionId": "b44b11c5-7a21-4e86-abef-e1d888258873",
                            "productCd": "d34d3402-36c2-483e-972e-f9ff01f8a47f",
                            "activeInactiveInd": "Y",
                            "productInfo": {
                                "productCd": "d34d3402-36c2-483e-972e-f9ff01f8a47f",
                                "productNm": "Winter New",
                                "activeInactiveInd": "N",
                                "manualPricing": 0,
                                "countryCode": "us",
                                "productGroup": {
                                    "productGroupCd": productGroupCd,
                                    "productGroupNm": "Fuel",
                                    "activeInactiveInd": "Y"
                                },
                                "productIcon": {
                                    "productIconCd": productIconCd,
                                    "productIconNm": "Brown",
                                    "productIconHexCode": "#743410",
                                    "activeInactiveInd": "Y"
                                }
                            }
                        }, {
                            "ruleExceptionId": "bbb3c29f-bc81-4e34-aa32-b5241feb10cc",
                            "productCd": "f8d3eff8-3045-45a1-b052-a3ee0fb5961a",
                            "activeInactiveInd": "Y",
                            "productInfo": {
                                "productCd": "f8d3eff8-3045-45a1-b052-a3ee0fb5961a",
                                "productNm": "regular o",
                                "activeInactiveInd": "Y",
                                "manualPricing": 0,
                                "countryCode": "us",
                                "productGroup": {
                                    "productGroupCd": productGroupCd,
                                    "productGroupNm": "Fuel",
                                    "activeInactiveInd": "Y"
                                },
                                "productIcon": {
                                    "productIconCd": "3b02ae9f-17e4-4563-a258-ea8dc996ce32",
                                    "productIconNm": "Purple",
                                    "productIconHexCode": "#641964",
                                    "activeInactiveInd": "Y"
                                }
                            }
                        }]
                    }, {
                        "ruleId": "ee5d965a-1409-4239-816a-bab16902291c",
                        "city": "Culpeper",
                        "state": "VA",
                        "countryCode": "us",
                        "yearNo": 2008,
                        "activeInactiveInd": "Y",
                        "vehicleRuleProducts": [{
                            "ruleExceptionId": "1bac53d9-683d-44fd-8566-fbf27863e3ff",
                            "productCd": "64e83707-b387-46c0-8e27-700e2a448b82",
                            "activeInactiveInd": "Y",
                            "productInfo": {
                                "productCd": "64e83707-b387-46c0-8e27-700e2a448b82",
                                "productNm": "Diesel New",
                                "activeInactiveInd": "Y",
                                "manualPricing": 0,
                                "countryCode": "us",
                                "productGroup": {
                                    "productGroupCd": productGroupCd,
                                    "productGroupNm": "Fuel",
                                    "activeInactiveInd": "Y"
                                },
                                "productIcon": {
                                    "productIconCd": productIconCd2,
                                    "productIconNm": productIconNm,
                                    "productIconHexCode": "#BED50F",
                                    "activeInactiveInd": "Y"
                                }
                            }
                        }, {
                            "ruleExceptionId": "70c31d41-ea26-4cab-8b54-e3021425cace",
                            "productCd": productCd,
                            "activeInactiveInd": "Y",
                            "productInfo": {
                                "productCd": productCd,
                                "productNm": "Barun 1",
                                "activeInactiveInd": "N",
                                "manualPricing": 0,
                                "countryCode": "us",
                                "productGroup": {
                                    "productGroupCd": productGroupCd,
                                    "productGroupNm": "Fuel",
                                    "activeInactiveInd": "Y"
                                },
                                "productIcon": {
                                    "productIconCd": productIconCd2,
                                    "productIconNm": productIconNm,
                                    "productIconHexCode": "#BED50F",
                                    "activeInactiveInd": "Y"
                                }
                            }
                        }]
                    }]
                }
            })
        );
    });
};



export const getVehicleDetails = () => {
    return rest.get('*/api/vehicle-service/vehicle-rules*', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                "data": {
                  "ruleId": "aa87757d-8e84-485c-a324-6e4b7e83a84e",
                  "city": "Culpeper",
                  "state": "VA",
                  "countryCode": "us",
                  "yearNo": 2006,
                  "activeInactiveInd": "Y",
                  "vehicleRuleProducts": [
                    {
                      "ruleExceptionId": "275da655-5581-49ad-98a7-c92472e95464",
                      "productCd": "dd36329a-f802-47a4-9551-e6eb6f35634f",
                      "activeInactiveInd": "Y",
                      "productInfo": {}
                    }
                  ]
                },
                "error": null
              })
        );
    });
};
