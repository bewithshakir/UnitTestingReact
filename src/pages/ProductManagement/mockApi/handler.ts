import { rest } from "msw";

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
        "error": null
      })
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
              "bioType": "string"
            }
          ]
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