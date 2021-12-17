import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AddProduct from './AddProduct';
import { Box, Grid } from '@mui/material';
import "./ProductManagement.scss";
import ProductList from './ProductList';
import { useProductsByLotId } from './queries';

export default function ProductManagement() {
    const [productList, setProductList] = useState([]);
    const [productId, setProductId] = useState('');
    const [searchTerm, setSearchTerm] = useState("");
    const onInputChange = (value: string) => {
        setSearchTerm(value);
    };

    const [reloadKey, editReloadKey] = useState<string | null>(null);
    const [topButtonRowDisabled, makeTopButtonRowDisabled] = useState(true);

    const { pathname } = useLocation();
    const a = pathname.split('/');
    const lotId = a[5];

    const getProductId = (row: any) => {
        setProductId(row.applicableProductId);
        makeTopButtonRowDisabled(false);
    };

    const { data: productListData, fetchNextPage, isLoading, isFetching }: any = useProductsByLotId(lotId, searchTerm, reloadKey);

    useEffect(() => {
        if (productListData) {
            const list: any = [];
            productListData?.pages?.forEach((item: any) => {
                list.push(...item.data.lotProducts);
            });
            setProductList(list);
        }
    }, [productListData]);

    const reloadSibling = (timeStamp: string) => {
        editReloadKey(timeStamp);
        makeTopButtonRowDisabled(true);
    };

    return (
        <Fragment>
            <Box display="flex" className='product-management'>
                <Grid container direction="row">
                    <Grid item md={3} sm={12} xs={12} sx={{ pt: 3, pr: 3 }}>
                        <ProductList
                            searchTerm={searchTerm}
                            searchTermInputChange={onInputChange}
                            productData={productList}
                            isLoadingData={isLoading || isFetching}
                            loadNextPage={fetchNextPage}
                            reloadKey={reloadKey}
                            handleRowAction={getProductId}
                        />
                    </Grid>
                    <Grid item md={9} sm={12} xs={12} p={3} className="masterRightLayout">
                        <AddProduct lotId={lotId} reloadSibling={reloadSibling} productId={productId} disableAddEditButton={topButtonRowDisabled} />
                    </Grid>
                </Grid>
            </Box>
        </Fragment>
    );
}