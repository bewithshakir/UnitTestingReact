import { Fragment, useState } from 'react';
import { Grid, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';
import TwoColSection from "./TwoColSection.component";
import TripleColSection from "./TripleColSection.component";
import { useGetProductsByLotId } from '../queries';
import { maskPhoneNumber } from "../../../utils/helperFunctions";
import './InfoViewUI.scss';

type props = {
    rowLotId: string;
    lotData: any;
}

export default function InfoViewUI({ lotData, rowLotId }: props) {
    const { t } = useTranslation();

    const [infoPanelObj, setInfoPanelObj] = useState<any>(null);

    const onGetProductSuccess = (data: any) => {
        if (data?.data?.lotProducts) {
            const lotProductData = data?.data?.lotProducts;
            let productDataObj: any = null;
            if (lotProductData?.length) {
                productDataObj = {};
                lotProductData.forEach((product: any, index: number) => {
                    productDataObj[product.productNm] = {
                        key: product.productNm,
                        subKey: '(Custom name)',
                        midValue: product.totalPricePerGallon,
                        endValue: product.pricingModel?.pricingModelNm
                    };
                });
            }
            createLotInfoObj(productDataObj);
        }
    };
    const onGetProductError = (err: any) => {
        console.warn(err);
    };

    useGetProductsByLotId(rowLotId, onGetProductSuccess, onGetProductError);

    const createLotInfoObj = (productData: any) => {
        const dataObj: any = {
            panelHeading: 'Test lot',
            panelData: {
                lotDetails: {
                    heading: t("parkingLotManagement.infoView.lotDetails"),
                    type: '2-col',
                    data: {
                        'Lot Name': lotData?.deliveryLocationNm,
                        'Address': lotData?.streetAddress,
                        'City': lotData?.cityNm,
                        'State': lotData?.stateNm,
                        'Zip Code': lotData?.postalCd,
                    }
                },
                pricing: {
                    heading: t("parkingLotManagement.infoView.pricing"),
                    type: '3-col',
                    data: productData,
                },
                lotContact: {
                    heading: t("parkingLotManagement.infoView.lotContact"),
                    type: '2-col',
                    data: {
                        "Primary Contact Name": lotData?.primaryContactName,
                        "Primary Contact Number": maskPhoneNumber(lotData?.primaryContactNumber),
                        "Primary Contact Email": lotData?.primaryContactEmail,
                    }
                }
            }
        };
        setInfoPanelObj(dataObj);
    };

    return (
        <Fragment>
            <div className="infoPanelUI">
                <Typography color="#000000DE" variant="h5" px={1} pt={1} pb={1} pl={2} className="opis-rack-info-text">
                    {t("parkingLotManagement.infoView.addproductopistext")}
                </Typography>
                <Grid container spacing={4}>
                    {infoPanelObj?.panelData && Object.entries(infoPanelObj?.panelData).map(([key, value]: any[]) =>
                        <Fragment key={key}>
                            {value?.type === '2-col' && <TwoColSection data={value} />}
                            {value?.type === '3-col' && <TripleColSection data={value} />}
                        </Fragment>)
                    }
                </Grid>
            </div>
        </Fragment>
    );
}