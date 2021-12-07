import { Fragment, useState } from 'react';
import Search from '../../components/UIComponents/SearchInput/SearchInput';
import { useTranslation } from "react-i18next";
import { DeleteIcon, YellowFuelIcon, RedFuelIcon, GreenFuelIcon, NavyBlueFuelIcon, AlertExclamationIcon } from '../../assets/icons';
import GridComponent from "../../components/UIComponents/DataGird/grid.component";
import { headerObj } from '../../components/UIComponents/DataGird/grid.component';
import { IconButton, Grid } from "@mui/material";
import './ProductList.scss';


// interface props { 

// }

export function headerTable(): headerObj[] {
    return [
        { field: "productNm", label: "PRODUCT NAME", type: 'text' },
        { field: "pricingModel", label: "PRICING MODEL", type: 'text' },
        {
            field: "status",
            label: "",
            type: 'status',
            align: 'center',
            showIconLast: true,
            fieldOptions: [
                {
                    value: "expired",
                    icon: AlertExclamationIcon,
                }
            ]
        },
        {
            field: "fuelType",
            label: "",
            type: 'status',
            align: 'center',
            showIconLast: true,
            fieldOptions: [
                {
                    value: "Regular",
                    icon: YellowFuelIcon,
                },
                {
                    value: "Premium",
                    icon: RedFuelIcon,
                },
                {
                    value: "Diesel",
                    icon: GreenFuelIcon,
                },
                {
                    value: "V-Power",
                    icon: NavyBlueFuelIcon,
                },
            ]
        },
    ];
}

export const mockData = [
    { productNm: 'Product ABC', pricingModel: 'OPIS Rack', fuelType: 'Regular', status:''},
    { productNm: 'Product Name', pricingModel: 'OPIS Retail', fuelType: 'Premium', status: 'expired'},
    { productNm: 'Product Custom', pricingModel: 'Custom', fuelType: 'Diesel', status: '' },
    { productNm: 'Product XYZ', pricingModel: 'OPIS Retail', fuelType: 'V-Power', status: '' },
    { productNm: 'Product ABC', pricingModel: 'OPIS Rack', fuelType: 'Regular', status: '' },
    { productNm: 'Product Name', pricingModel: 'OPIS Retail', fuelType: 'Premium', status: 'expired' },
    { productNm: 'Product Custom', pricingModel: 'Custom', fuelType: 'Diesel', status: '' },
    { productNm: 'Product XYZ', pricingModel: 'OPIS Retail', fuelType: 'V-Power', status: '' },
    { productNm: 'Product ABC', pricingModel: 'OPIS Rack', fuelType: 'Regular', status: '' },
    { productNm: 'Product Name', pricingModel: 'OPIS Retail', fuelType: 'Premium', status: 'expired' },
    { productNm: 'Product Custom', pricingModel: 'Custom', fuelType: 'Diesel', status: '' },
    { productNm: 'Product XYZ', pricingModel: 'OPIS Retail', fuelType: 'V-Power', status: '' },
    { productNm: 'Product ABC', pricingModel: 'OPIS Rack', fuelType: 'Regular', status: '' },
    { productNm: 'Product Name', pricingModel: 'OPIS Retail', fuelType: 'Premium', status: 'expired' },
    { productNm: 'Product Custom', pricingModel: 'Custom', fuelType: 'Diesel', status: '' },
    { productNm: 'Product XYZ', pricingModel: 'OPIS Retail', fuelType: 'V-Power', status: '' },
    { productNm: 'Product ABC', pricingModel: 'OPIS Rack', fuelType: 'Regular', status: '' },
    { productNm: 'Product Name', pricingModel: 'OPIS Retail', fuelType: 'Premium', status: 'expired' },
    { productNm: 'Product Custom', pricingModel: 'Custom', fuelType: 'Diesel', status: '' },
    { productNm: 'Product XYZ', pricingModel: 'OPIS Retail', fuelType: 'V-Power', status: '' }
];

export default function ProductList() {
    const [searchTerm, setSearchTerm] = useState("");
    const { t } = useTranslation();
    const headCells = headerTable();

    const onInputChange = (value: string) => {
        setSearchTerm(value);
    };

    return (
        <Fragment>
            <Grid container className="product-list">
                    <Grid item xs={8} md={10} pb={3}>
                        <Search
                            name="searchTerm"
                            value={searchTerm}
                            delay={600}
                            onChange={onInputChange}
                            placeholder={t('productManagement.search')}
                        />
                    </Grid>
                    <Grid item xs={4} md={2} pb={3}>
                        <IconButton aria-label='search' edge='end'>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12} md={12} pb={5}>
                        <GridComponent
                            primaryKey='productId'
                            rows={mockData}
                            header={headCells}
                            isLoading={false}
                            isChildTable
                            enableRowSelection
                            getPages={false}
                            searchTerm={searchTerm}
                            noDataMsg='Add Products to setup the fee details to complete the lot requirement.'
                        />
                    </Grid>
                </Grid>
        </Fragment>
    );
}