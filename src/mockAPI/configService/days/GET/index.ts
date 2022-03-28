import { rest } from "msw";


export const getConfigServiceDays = () => rest.get('*/api/config-service/days', (req, res, ctx) => {
    return res(
        ctx.status(200),
        ctx.json(
            {
                data: [
                    {
                        dayOfWeekCd: '9773f1f0-7924-42dc-b228-92b51d853d3d',
                        dayOfWeekNm: 'Monday',
                        activeInactiveInd: 'Y'
                    },
                    {
                        dayOfWeekCd: '8cf7b634-2642-4f47-a594-1ad54e53e3ef',
                        dayOfWeekNm: 'Tuesday',
                        activeInactiveInd: 'Y'
                    },
                    {
                        dayOfWeekCd: '9bac3541-88aa-4424-80b1-154ac054b98d',
                        dayOfWeekNm: 'Wednesday',
                        activeInactiveInd: 'Y'
                    },
                    {
                        dayOfWeekCd: '9f93f6c7-0d4f-4b91-89f4-293717ba2c5e',
                        dayOfWeekNm: 'Thursday',
                        activeInactiveInd: 'Y'
                    },
                    {
                        dayOfWeekCd: 'ea58df3f-0805-4f44-a218-8a277999d7f3',
                        dayOfWeekNm: 'Friday',
                        activeInactiveInd: 'Y'
                    },
                    {
                        dayOfWeekCd: 'f7e093fe-e757-48ba-a799-3d41db5eb40e',
                        dayOfWeekNm: 'Saturday',
                        activeInactiveInd: 'Y'
                    },
                    {
                        dayOfWeekCd: 'd40dd47a-f615-4469-8df7-43656445345f',
                        dayOfWeekNm: 'Sunday',
                        activeInactiveInd: 'Y'
                    }
                ],
                error: null
            }
        ));
});