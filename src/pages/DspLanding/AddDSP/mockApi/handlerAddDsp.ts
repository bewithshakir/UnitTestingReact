import { rest } from "msw";

export const addDspHandler = () => {
    return rest.post('*/api/customer-service/dsp', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: {
                    "dspId": "c528c7cd-10e1-4598-b6f1-1d99ecd32516",
                    "dspName": "Test dsp33",
                    "contactName": "steve",
                    "contactEmailId": "newcustomer@gmail.com",
                    "contactPhoneNumber": "8939785301",
                    "addressLine1": "Houston Court, , , ",
                    "addressLine2": "Houston Ct",
                    "cityNm": "Saratoga",
                    "stateNm": "CA",
                    "postalCd": "95070",
                    "customerId": "b65e09d5-7d93-431a-94db-04bd7614b269",
                    "activeInactiveInd": "Y",
                    "lastUpdatedDtm": "2022-01-21T05:56:54.039Z",
                    "createdDtm": "2022-01-21T05:56:54.039Z",
                    "deletedDtm": null
                },
                "error": null
            })
        );
    });
};
