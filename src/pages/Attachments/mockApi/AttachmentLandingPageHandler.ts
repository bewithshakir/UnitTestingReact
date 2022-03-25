// import { rest } from "msw";

// export const getAttachmentListHandler = () => {
//     return rest.get('*/api/customer-service/customers/1002/files*', (req, res, ctx) => {
//         return res(
//             ctx.status(200),
//             ctx.json({
//                 data: {
//                     "customerDocuments": [
//                         {
//                             "customerDocumentId": "95a6c816-05bd-4a6e-b2c5-bcf4b271b8f0",
//                             "customerId": "045b08e9-5147-42dd-a8ed-0c6e01287189",
//                             "documentName": "sample.pdf",
//                             "documentFormat": "pdf",
//                             "dateAdded": "2022-01-17T06:17:18.312Z",
//                             "uploadedBy": "Abc",
//                             "uploadedIn": "customerContract"
//                         },
//                         {
//                             "customerDocumentId": "cdd1b700-be4b-4743-8602-cb6be9d26951",
//                             "customerId": "045b08e9-5147-42dd-a8ed-0c6e01287189",
//                             "documentName": "file_example_XLSX_10.xlsx",
//                             "documentFormat": "xlsx",
//                             "dateAdded": "2022-01-17T06:17:32.208Z",
//                             "uploadedBy": "Abc",
//                             "uploadedIn": "customerContract"
//                         }
//                     ]

//                 }
//             })
//         );
//     });
// };