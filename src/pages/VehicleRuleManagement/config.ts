import { IDynamicFilterProps } from "../../components/UIComponents/RightInfoPanel/DynamicFilterContent.component";
import { DeleteIcon, ExportIcon, ImportIcon } from '../../assets/icons';

export const SORTBY_TYPES = {
    ASSET_PAYMENT: "payment in progress",
    RECENTLY_ADDED: "recently added asset",
};

export const MASS_ACTION_TYPES = {
    IMPORT: 'import',
    EXPORT: 'export',
    DELETE: 'remove',
};

export const ROW_ACTION_TYPES = {
    EDIT: 'edit',
    DELETE: 'delete',
    CONTACT_DETAILS: 'contact details'
};


export const filterByFields: IDynamicFilterProps['fields'] = [
    { name: 'state', label: 'customer-filter-panel.state', fieldType: 'select', optionUrlKey: 'assetFilter', optionAPIResponseKey: 'states', initialValue: [] },
    { name: 'city', label: 'customer-filter-panel.city', fieldType: 'select', optionUrlKey: 'assetFilter', optionAPIResponseKey: 'cities', initialValue: [] }
];

export const VehicleRule = {
    LandingPage: {
        SortByOptions: [
            "assetManagement.sortBy.payment in progress",
            "assetManagement.sortBy.recently added asset"
        ],
        filterByFields,
        MassActionOptions: [
            {
                label: "menus.actions.import data",
                icon: ImportIcon,
                action: MASS_ACTION_TYPES.IMPORT
            },
            {
                label: "menus.actions.export data",
                icon: ExportIcon,
                action: MASS_ACTION_TYPES.EXPORT
            },
            {
                label: "menus.actions.delete",
                icon: DeleteIcon,
                action: MASS_ACTION_TYPES.DELETE
            },
        ],
        RowActionsOptions: [
            {
                label: "menus.data-grid-actions.edit",
                action: ROW_ACTION_TYPES.EDIT
            }
        ],
        DataGridFields: {
            "ASSET_TYPE": {
                field: "assetNm", label: "ASSET TYPE"
            },
            "STATUS": {
                field: "activeInactiveInd", label: "STATUS"
            }
        },
    }
};