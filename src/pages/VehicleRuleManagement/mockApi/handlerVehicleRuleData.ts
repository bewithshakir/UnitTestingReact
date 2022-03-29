// import { rest } from "msw";

// const PRODUCT_CODE_ID = "9fa85e21-fab8-48d2-af36-85c7686e7666";
// const PRODUCT_ICON_CODE = "a59eac7d-d7fe-4635-805a-dc8e38bfa750";

// export const getVehicleRuleDataHandler = () => {
//     return rest.get('*api/vehicle-service/vehicle-rules*', (req, res, ctx) => {
//         console.log('req--', req.url.pathname)
//         const search = req.url.searchParams.get('search');
//         const limit = req.url.searchParams.get('limit');
//         return res(
//             ctx.status(200),
//             ctx.json(
//                 limit ?
//                     {
//                         data: {
//                             pagination: {
//                                 "totalCount": search?.trim() && search !== "Test Vehicle Rule" ? 0 : 1,
//                                 "limit": 15,
//                                 "offset": 0
//                             },
//                             vehicleRules:
//                                 search !== "Test Vehicle Rule" ? []
//                                     : [
//                                         {
//                                             "ruleId": "b66fa656-f211-469a-a149-50bfc50a45eb",
//                                             "city": "San Antonio",
//                                             "state": "TX",
//                                             "countryCode": "us",
//                                             "yearNo": 2009,
//                                             "activeInactiveInd": "Y",
//                                             "vehicleRuleProducts": [
//                                                 {
//                                                     "ruleExceptionId": "047974c3-9869-4046-ac35-c039875b60aa",
//                                                     "productCd": PRODUCT_CODE_ID,
//                                                     "activeInactiveInd": "Y",
//                                                     "productInfo": {
//                                                         "productCd": PRODUCT_CODE_ID,
//                                                         "productNm": "1 Purple Product",
//                                                         "activeInactiveInd": "Y",
//                                                         "manualPricing": 0,
//                                                         "countryCode": "us",
//                                                         "productGroup": {
//                                                             "productGroupCd": "0f117f3d-02a8-4d5e-9a97-eb67a66509cf",
//                                                             "productGroupNm": "Non-Fuel",
//                                                             "activeInactiveInd": "Y"
//                                                         },
//                                                         "productIcon": {
//                                                             "productIconCd": PRODUCT_ICON_CODE,
//                                                             "productIconNm": "Green",
//                                                             "productIconHexCode": "#008443",
//                                                             "activeInactiveInd": "Y"
//                                                         }
//                                                     }
//                                                 },
//                                                 {
//                                                     "ruleExceptionId": "0fb94ede-14f9-4260-b125-24fbf81c37b7",
//                                                     "productCd": "1fca4cbb-e592-4073-96d8-0e3e83fd48b4",
//                                                     "activeInactiveInd": "Y",
//                                                     "productInfo": {
//                                                         "productCd": "1fca4cbb-e592-4073-96d8-0e3e83fd48b4",
//                                                         "productNm": "Premium444",
//                                                         "activeInactiveInd": "N",
//                                                         "manualPricing": 0,
//                                                         "countryCode": "us",
//                                                         "productGroup": {
//                                                             "productGroupCd": "acad56a6-1e77-4f38-92e5-30a656e786fb",
//                                                             "productGroupNm": "Fuel",
//                                                             "activeInactiveInd": "Y"
//                                                         },
//                                                         "productIcon": {
//                                                             "productIconCd": "f5f52aa5-9a03-4ea5-8885-d872151b819d",
//                                                             "productIconNm": "Brown",
//                                                             "productIconHexCode": "#743410",
//                                                             "activeInactiveInd": "Y"
//                                                         }
//                                                     }
//                                                 }
//                                             ]
//                                         }
                        
//                                     ]
//                                 }
//                             }
//                     :
//                     {
//                         "data": {
//                             "pagination": {
//                                 "totalCount": 9,
//                                 "limit": 5,
//                                 "offset": 0
//                             },
//                             "vehicleRules": [
//                                 {
//                                     "ruleId": "b66fa656-f211-469a-a149-50bfc50a45eb",
//                                     "city": "San Antonio",
//                                     "state": "TX",
//                                     "countryCode": "us",
//                                     "yearNo": 2009,
//                                     "activeInactiveInd": "Y",
//                                     "vehicleRuleProducts": [
//                                         {
//                                             "ruleExceptionId": "047974c3-9869-4046-ac35-c039875b60aa",
//                                             "productCd": PRODUCT_CODE_ID,
//                                             "activeInactiveInd": "Y",
//                                             "productInfo": {
//                                                 "productCd": PRODUCT_CODE_ID,
//                                                 "productNm": "1 Purple Product",
//                                                 "activeInactiveInd": "Y",
//                                                 "manualPricing": 0,
//                                                 "countryCode": "us",
//                                                 "productGroup": {
//                                                     "productGroupCd": "0f117f3d-02a8-4d5e-9a97-eb67a66509cf",
//                                                     "productGroupNm": "Non-Fuel",
//                                                     "activeInactiveInd": "Y"
//                                                 },
//                                                 "productIcon": {
//                                                     "productIconCd": PRODUCT_ICON_CODE,
//                                                     "productIconNm": "Green",
//                                                     "productIconHexCode": "#008443",
//                                                     "activeInactiveInd": "Y"
//                                                 }
//                                             }
//                                         },
//                                         {
//                                             "ruleExceptionId": "0fb94ede-14f9-4260-b125-24fbf81c37b7",
//                                             "productCd": "1fca4cbb-e592-4073-96d8-0e3e83fd48b4",
//                                             "activeInactiveInd": "Y",
//                                             "productInfo": {
//                                                 "productCd": "1fca4cbb-e592-4073-96d8-0e3e83fd48b4",
//                                                 "productNm": "Premium444",
//                                                 "activeInactiveInd": "N",
//                                                 "manualPricing": 0,
//                                                 "countryCode": "us",
//                                                 "productGroup": {
//                                                     "productGroupCd": "acad56a6-1e77-4f38-92e5-30a656e786fb",
//                                                     "productGroupNm": "Fuel",
//                                                     "activeInactiveInd": "Y"
//                                                 },
//                                                 "productIcon": {
//                                                     "productIconCd": "f5f52aa5-9a03-4ea5-8885-d872151b819d",
//                                                     "productIconNm": "Brown",
//                                                     "productIconHexCode": "#743410",
//                                                     "activeInactiveInd": "Y"
//                                                 }
//                                             }
//                                         }
//                                     ]
//                                 }

//                             ]
//                         },
//                         "error": null
//                     }
//             )
//         );
//     });
// };

