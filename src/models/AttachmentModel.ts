import { useTranslation } from "react-i18next";
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
        const { t } = useTranslation();
        return [
            { field: "documentName", label:t('Attachments.documentName'), type: 'text' },
            { field: "documentFormat", label: t('Attachments.format') , type: 'text' },
            { field: "dateAdded", label: t('Attachments.dateAdded'), type: 'text' },
            { field: "uploadedBy", label: t('Attachments.uploadedBy'), type: 'text' },
            { field: "uploadedIn", label: t('Attachments.uploadedIn'), type: 'text' },
        ];
    }
}