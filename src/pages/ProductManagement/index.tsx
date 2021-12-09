import { Fragment, useEffect, useState } from 'react';
import AddProduct from './AddProduct';
import { Box, Grid } from '@mui/material';
import "./ProductManagement.scss";
import ProductList from './ProductList';
import { useProductsByLotId } from './queries';
import { useAddedCustomerIdStore, useAddedParkingLotIdStore } from '../../store';

export default function ProductManagement() {
    const [productList, setProductList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const onInputChange = (value: string) => {
        setSearchTerm(value);
    };

    const customerId = useAddedCustomerIdStore((state) => state.customerId);
    const lotId = useAddedParkingLotIdStore((state) => state.parkingLotId);
    const [reloadKey, reloadSibling]= useState(null);
    // eslint-disable-next-line no-console
    console.log('CID:', customerId, 'LID:', lotId);

    const { data, fetchNextPage, isLoading, isFetching }: any = useProductsByLotId(lotId, searchTerm);

    useEffect(() => {
        if (data) {
            const list: any = [];
            data?.pages?.forEach((item: any) => {
                list.push(...item.data.lotProducts);
            });
            setProductList(list);
        }
    }, [data]);

    return (
        <Fragment>
            <Box display="flex" className='product-management'>
                <Grid container direction="row">
                    <Grid item md={4} sm={12} xs={12}>
                      <ProductList 
                        searchTerm={searchTerm}
                        searchTermInputChange={onInputChange}
                        productData={productList}
                        isLoadingData={isLoading || isFetching}
                        loadNextPage={fetchNextPage}
                        reloadKey={reloadKey}
                      />
                    </Grid>
                    <Grid item md={8} sm={12} xs={12} pl={4}>
                        <AddProduct lotId={lotId} reloadSibling={reloadSibling}/>
                    </Grid>
                </Grid>
            </Box>
        </Fragment>
    );
}