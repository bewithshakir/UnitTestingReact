import { rest } from 'msw';

export const getAllParkingLotsHandler = () => {
  return rest.get('*/api/customer-service/lots*', (req, res, ctx) => {
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
              deliveryLocationId: 'd0535fcf-de9c-45ca-8a52-c2275710ae23',
              deliveryLocationNm: 'Barun Demo 5',
              lotId: '76123456',
              customerId: '167fd7be-c20e-412a-bac0-502672a055d6',
              customerName: 'Barun Demo 5',
              streetAddress:
                '77 Green Acres Rd S,  Green Acres Rd S,,   Green Acres Rd S, USA',
              cityNm: 'Valley Stream',
              stateNm: 'NY',
              postalCd: '11581',
              rackUpdate: '27-02-2021 7:09 PM',
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
              rackUpdate: '27-02-2021 7:09 PM',
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
              rackUpdate: '27-02-2021 7:09 PM',
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
  });
};

export const getProductsForParkingLot = () => {
  return rest.get(
    '*/api/customer-service/lots/*/products*',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          data: {
            pagination: {},
            lotProducts: [
              {
                applicableProductId: 'c939d8dd-53f1-41f5-9fe6-a5dfd99ac812',
                deliveryLocationId: 'd0535fcf-de9c-45ca-8a52-c2275710ae23',
                productId: '0dd5f587-8c6f-40ce-9f77-1616f4b5b842',
                productNm: 'Diesel',
                productColor: {
                  productIconCd: 'cdc00914-dbef-4603-89c5-9f18e4af3ccc',
                  productIconNm: 'Parrot Green',
                  productIconHexCode: '#BED50F',
                  activeInactiveInd: 'Y',
                },
                pricingModel: {
                  pricingModelCd: '7f5411c8-ae32-43f6-a05e-146b4d866206',
                  pricingModelNm: 'OPIS Rack',
                  countryCd: 'us',
                  activeInactiveIndicator: 'Y',
                },
                activeInactiveInd: 'Y',
                opisRackStatus: 'N',
                opisProductKey:
                  'biodieselb0-5smeuls#2wintersx105opisaverage0no2nynewyorksme',
                totalPricePerGallon: '16.8416',
                manualPriceAmt: 4.727,
                addedPriceAmt: 1,
                discountPriceAmt: null,
              },
              {
                applicableProductId: '5eab3686-7ec9-4cdc-80d5-833dc080b54b',
                deliveryLocationId: 'd0535fcf-de9c-45ca-8a52-c2275710ae23',
                productId: '8ee38e73-f9dd-40ca-a53c-49327eab1487',
                productNm: 'Regular1 Retail',
                productColor: {
                  productIconCd: '1bcfe6f1-0fae-4473-a686-82084c8a5030',
                  productIconNm: 'Aqua',
                  productIconHexCode: '#89CFDC',
                  activeInactiveInd: 'Y',
                },
                pricingModel: {
                  pricingModelCd: '945d3d8b-57bb-42c8-88a5-2dae9cd230f0',
                  pricingModelNm: 'OPIS Retail',
                  countryCd: 'us',
                  activeInactiveIndicator: 'Y',
                },
                activeInactiveInd: 'Y',
                opisRackStatus: 'Y',
                opisProductKey: null,
                totalPricePerGallon: '5.4540',
                manualPriceAmt: 4.954,
                addedPriceAmt: 2.1,
                discountPriceAmt: 1.6,
              },
            ],
          },
          error: null,
        })
      );
    }
  );
};
