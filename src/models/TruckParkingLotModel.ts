import { useTranslation } from 'react-i18next';
import { headerObj } from '../components/UIComponents/DataGird/grid.component';


const DataGridFields = {
    "CITY": {
      field: "cityName", label: "CITY"
    },
    "STATE": {
      field: "stateName", label: "STATE"
    },
    "PRODUCT": {
      field: "productsCount", label: "PRODUCT"
    }
  }
export default class TruckParkingLotModel {

    // "id": "a3f54ade-ff65-4055-a968-7f3cb06bffb1",
    //             "name": "Packing Location 16",
    //             "address": "Address 1   Address 2",
    //             "city": "Silchar",
    //             "state": "Assam",
    //             "postalCode": "788003"

    fieldsToDisplay (): headerObj[] {
        return [
            { field: "name", label: "TRUCK PARKING LOT NAME", type: 'text', width: '350px' },
            { field: "address", label: "ADDRESS", type: 'text'},
            { field: "state", label: "STATE", type: 'text'},
            { field: "city", label: "CITY", type: 'text'},
            { field: "postalCode", label: "POSTAL CODE", type: 'text'}
        ];
    }

    rowActions() {
        const { t } = useTranslation();
        return [
            {
                label: t("menus.data-grid-actions.edit"),
                action: this.ACTION_TYPES.EDIT
            },
            {
                label: t("menus.data-grid-actions.delete"),
                action: this.ACTION_TYPES.DELETE
            },
        ];
    }

    ACTION_TYPES = {
        EDIT: 'edit',
        DELETE: 'delete',
    };

    MASS_ACTION_TYPES = {
        IMPORT: 'import',
        EXPORT: 'export',
        DELETE: 'remove',
    };

    massActions() {
        const { t } = useTranslation();
        return [
            {
                label: t("menus.actions.import data"),
                icon: "ImportIcon",
                action: this.MASS_ACTION_TYPES.IMPORT
            },
            {
                label: t("menus.actions.export data"),
                icon: "ExportIcon",
                action: this.MASS_ACTION_TYPES.EXPORT
            },
            {
                label: t("menus.actions.delete"),
                icon: "DeleteIcon",
                action: this.MASS_ACTION_TYPES.DELETE
            },
        ];
    }
}