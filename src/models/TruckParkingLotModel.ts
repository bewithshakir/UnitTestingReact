import { useTranslation } from 'react-i18next';

type fieldOptions = {
    value: string;
    displayValue?: string;
    color?: string;
    icon?: React.ReactNode | string | any,
}
interface headerObj {
    field: string,
    showIconLast?: boolean,
    label: string,
    type: 'text' | 'button' | 'icon' | 'icons' | 'image' | 'images' | 'dropdown' | 'status' | 'product',
    icon?: React.ReactNode | string | any,
    bold?: boolean,
    align?: 'right' | 'left' | 'center' | 'justify',
    sortable?: boolean,
    width?: string,
    fieldOptions?: fieldOptions[]
}

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

    fieldsToDisplay (): headerObj[] {
        const { CITY, STATE, PRODUCT } = DataGridFields;
        return [
            { field: CITY.field, label: CITY.label, type: 'text', align: 'left' },
            { field: STATE.field, label: STATE.label, type: 'text', align: 'left' },
            { field: PRODUCT.field, label: PRODUCT.label, type: 'button', align: 'left', icon: '' },
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