//import { useTranslation } from 'react-i18next';
import { headerObj } from './../components/UIComponents/DataGird/grid.component';
//import { Attachments } from '../pages/Attachments/config';

export default class AttachmentsModel { 

    fieldsToDisplay(): headerObj[] {
        return [
            { field: "docName", label: "DOCUMENT NAME", type: 'text' },
            { field: "type", label: "TYPE", type: 'text' },
            { field: "format", label: "FORMAT", type: 'text' },
            { field: "dateAdded", label: "DATE ADDED", type: 'text' },
            { field: "uploadedBy", label: "UPLOADED BY", type: 'text' },
            { field: "uploadedIn", label: "UPLOADED IN", type: 'text' },
        ];
    }
}