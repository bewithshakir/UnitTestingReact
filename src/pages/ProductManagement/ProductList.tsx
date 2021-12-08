import { Fragment } from 'react';
import Search from '../../components/UIComponents/SearchInput/SearchInput';
import { useTranslation } from "react-i18next";
import { DeleteIcon } from '../../assets/icons';
import { Button } from '../../components/UIComponents/Button/Button.component';
import ProductModel from "../../models/LotProductModel";
import GridComponent from "../../components/UIComponents/DataGird/grid.component";
import { Grid } from "@mui/material";
import './ProductList.scss';


interface props { 
    searchTerm : string;
    searchTermInputChange: (value: string) => void;
    productData: any[];
    isLoadingData: boolean;
    loadNextPage: boolean;
}


export default function ProductList(props : props) {
    const ProductObj = new ProductModel();
    const headCells = ProductObj.fieldsToDisplay();
    const { t } = useTranslation();
   
    

    return (
        <Fragment>
            <Grid container className="product-list">
                <Grid item xs={8} md={10} pb={3}>
                    <Search
                        name="searchTerm"
                        value={props.searchTerm}
                        delay={600}
                        onChange={props.searchTermInputChange}
                        placeholder={t('productManagement.search')}
                    />
                </Grid>
                <Grid item xs={4} md={2} pb={3} pl={4.75}>
                    <Button
                        types="delete2"
                        aria-label="delete"
                        //onClick={() => { }}
                        startIcon={<DeleteIcon />}
                    >
                    </Button>
                </Grid>
                <Grid item xs={12} md={12} pb={5}>
                    <GridComponent
                        primaryKey='productId'
                        rows={ProductObj.dataModel(props.productData)}
                        header={headCells}
                        isLoading={props.isLoadingData}
                        isChildTable
                        enableRowSelection
                        getPages={props.loadNextPage}
                        searchTerm={props.searchTerm}
                        noDataMsg='Add Products to setup the fee details to complete the lot requirement.'
                    />
                </Grid>
            </Grid>
        </Fragment>
    );
}