import { headerObj } from '../components/UIComponents/DataGird/grid.component';
import { OPISCity } from '../pages/OPISCity/config';
import { useTranslation } from 'react-i18next';

export interface SelectProps {
    label: string,
    value: string,
}

const { MassActionOptions, RowActionsOptions, DataGridFields } = OPISCity.LandingPage;
export default class TaxModel {
    city: SelectProps;
    state: SelectProps;
    cityId: string;

    constructor() {
        this.city = { label: '', value: '' };
        this.state = { label: '', value: '' };
        this.cityId = '';
    }


    massActions () {
        const { t } = useTranslation();
        return MassActionOptions.map(actionItem => ({ ...actionItem, label: t(actionItem.label) }));
    }

    fieldsToDisplay (): headerObj[] {
        const { CITYID, CITY, STATE } = DataGridFields;
        return [
            { field: CITYID.field, label: CITYID.label, type: 'text', align: 'left' },
            { field: CITY.field, label: CITY.label, type: 'text', align: 'left' },
            { field: STATE.field, label: STATE.label, type: 'text', align: 'left' },
            { field: "", label: "", type: 'text', align: 'left' },
            { field: "", label: "", type: 'text', align: 'left' },
            { field: "", label: "", type: 'text', align: 'left' },
            { field: "", label: "", type: 'text', align: 'left' },
            { field: "", label: "", type: 'text', align: 'left' },
            { field: "", label: "", type: 'text', align: 'left' },
            { field: "", label: "", type: 'text', align: 'left' },
            { field: "", label: "", type: 'text', align: 'left' },
            { field: "", label: "", type: 'text', align: 'left' },
            { field: "", label: "", type: 'text', align: 'left' },
            { field: "", label: "", type: 'text', align: 'left' },
            { field: "", label: "", type: 'text', align: 'left' },
            { field: "", label: "", type: 'text', align: 'left' },
        ];
    }

    rowActions () {
        const { t } = useTranslation();
        return RowActionsOptions.map(actionItem => ({ ...actionItem, label: t(actionItem.label) }));
    }

}