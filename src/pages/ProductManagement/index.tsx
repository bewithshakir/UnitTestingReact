import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AddProduct from './AddProduct';
import { Box, Grid } from '@mui/material';
import "./ProductManagement.scss";
import ProductList from './ProductList';
import { useProductsByLotId } from './queries';
import { AlertExclamationIcon } from '../../assets/icons';


export default function ProductManagement() {
    const [productList, setProductList] = useState([]);
    const [productId, setProductId] = useState('');
    const [searchTerm, setSearchTerm] = useState("");
    const onInputChange = (value: string) => {
        setSearchTerm(value);
    };

    const [reloadKey, editReloadKey] = useState<string | null>(null);
    const [topButtonRowDisabled, makeTopButtonRowDisabled] = useState(false);
    const [isHiddenAddEditRow, hideAddEditRow] = useState(true);

    const { pathname } = useLocation();
    const a = pathname.split('/');
    const lotId = a[5];

    const getProductId = (row: any) => {
        setProductId(row.applicableProductId);
        hideAddEditRow(false);
    };

    const getProductStr = (str: string) => {
       return <div className='opisr-grid-item'> <div className='grid-itm-pn'>{str}</div> <div className='grid-item-icn'><AlertExclamationIcon /></div></div>;
    };

    const { data: productListData, fetchNextPage, isLoading, isFetching }: any = useProductsByLotId(lotId, searchTerm, reloadKey);

    useEffect(() => {
        if (productListData) {
            const list: any = [];
            productListData?.pages?.forEach((item: any) => {
                const arr = item.data.lotProducts.map((productObj: any)=>{
                    let str = productObj.pricingModel?.pricingModelNm;
                    if(productObj.pricingModel?.pricingModelNm?.toLowerCase() === 'opis rack'){
                        if(productObj.opisProductKey){
                            if(productObj.opisRackStatus?.toUpperCase() === 'N'){
                                str = getProductStr(str);
                            } 
                        }
                    }
                    return  {...productObj, opisRackAvail: str };
                });
                list.push(...arr);
            });
            setProductList(list);
        }
    }, [productListData]);

    const reloadSibling = (timeStamp: string) => {
        editReloadKey(timeStamp);
    };

    const hideTopRow = () => {
        hideAddEditRow(true);
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
                            makeTopButtonRowDisabled={makeTopButtonRowDisabled}
                        />
                    </Grid>
                    <Grid item md={9} sm={12} xs={12} p={3} className="masterRightLayout">
                        <AddProduct lotId={lotId} reloadSibling={reloadSibling} productId={productId}  disableAddEditButton={topButtonRowDisabled} isHiddenAddEditRow={isHiddenAddEditRow} hideAddEditRow={hideTopRow} />
                    </Grid>
                </Grid>
            </Box>
        </Fragment>
    );
}