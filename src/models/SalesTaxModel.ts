// import moment from 'moment';
// import { useTranslation } from 'react-i18next';
// import { DeleteIcon, ExportIcon, ImportIcon, OilCanIcon } from '../assets/icons';
// import { headerObj } from './../components/UIComponents/DataGird/grid.component';


export default class SalesTaxModel {
    countryCd: string;
    addressLine1: string;
    state: string;
    city: string;
    stateRate: string;
    localRate: string;
    federalRate: string;

    constructor() {
        this.countryCd = '',
        this.addressLine1 = '';
        this.state = '';
        this.city = '';
        this.stateRate = '';
        this.localRate = '';
        this.federalRate = '';
    }
    
}