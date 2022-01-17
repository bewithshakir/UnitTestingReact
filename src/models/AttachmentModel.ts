import { headerObj } from './../components/UIComponents/DataGird/grid.component';
import { formatDateAsMMDDYYYY } from '../utils/DateHelpers';

export default class AttachmentsModel { 

    dataModel(data: any) {
        return data.map((obj: any) => (
            {
                ...obj,
                dateAdded: formatDateAsMMDDYYYY(obj.dateAdded)
            }
        ));
    }

    fieldsToDisplay(): headerObj[] {
        return [
            { field: "documentName", label: "DOCUMENT NAME", type: 'text' },
            { field: "documentFormat", label: "FORMAT", type: 'text' },
            { field: "dateAdded", label: "DATE ADDED", type: 'text' },
            { field: "uploadedBy", label: "UPLOADED BY", type: 'text' },
            { field: "uploadedIn", label: "UPLOADED IN", type: 'text' },
        ];
    }
}