import { rest } from "msw";

export const addAssetHandler = () => {
    return rest.post('https://jsonplaceholder.typicode.com/posts', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: {
                    "title": "foo2 Test",
                    "body": "bar2",
                    "userId": 2,
                    "id": 101
                }
            })
        );
    });
};