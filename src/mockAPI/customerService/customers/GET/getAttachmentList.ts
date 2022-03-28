import { DefaultRequestBody, ResponseComposition, RestContext } from "msw";

const getAttachmentListHandler = (res: ResponseComposition<DefaultRequestBody>, ctx: RestContext) =>
    res(
        ctx.status(200),
        ctx.json({
            data: {
                pagination: {
                    limit: 15,
                    offset: 0,
                    totalCount: 1,
                },
                customerDocuments: [
                    {
                        "customerDocumentId": "95a6c816-05bd-4a6e-b2c5-bcf4b271b8f0",
                        "customerId": "045b08e9-5147-42dd-a8ed-0c6e01287189",
                        "documentName": "sample.pdf",
                        "documentFormat": "pdf",
                        "dateAdded": "2022-01-17T06:17:18.312Z",
                        "uploadedBy": "Abc",
                        "uploadedIn": "customerContract"
                    },
                ],
            },
            error: null
        })
    );
export default getAttachmentListHandler;