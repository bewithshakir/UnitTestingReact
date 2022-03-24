import { rest } from "msw";


export const getConfigServiceDeliveryFreq = () => rest.get('*/api/config-service/delivery-frequencies', (req, res, ctx) => {
    return res(
        ctx.status(200),
        ctx.json(
            {
                data: [
                    {
                        deliveryFrequencyCd: '5df91105-a8d5-418a-871a-f74311fdd145',
                        deliveryFrequencyNm: 'Bi-weekly',
                        activeInactiveInd: 'Y'
                    },
                    {
                        deliveryFrequencyCd: '741f106d-c3fc-4884-b777-f175c27c1626',
                        deliveryFrequencyNm: 'Weekends',
                        activeInactiveInd: 'Y'
                    },
                    {
                        deliveryFrequencyCd: 'c431f4de-2cdd-4089-bf7e-a60710d9f88c',
                        deliveryFrequencyNm: 'Weekly',
                        activeInactiveInd: 'Y'
                    },
                    {
                        deliveryFrequencyCd: 'defc92e9-c934-4e96-a579-e8e663d13d46',
                        deliveryFrequencyNm: 'Daily',
                        activeInactiveInd: 'Y'
                    },
                    {
                        deliveryFrequencyCd: 'e53141c2-7581-4a6a-8120-1d8310c18d7b',
                        deliveryFrequencyNm: 'Monthly',
                        activeInactiveInd: 'Y'
                    }
                ],
                error: null
            }
        ));
});