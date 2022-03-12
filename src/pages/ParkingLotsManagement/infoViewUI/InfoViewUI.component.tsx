import { Fragment, useState } from 'react';
import { Grid } from "@mui/material";
import { useTranslation } from 'react-i18next';
import TwoColSection from "./TwoColSection.component";
import TripleColSection from "./TripleColSection.component";
import { useGetProductsByLotId } from '../queries';
import { maskPhoneNumber } from "../../../utils/helperFunctions";
import DisclaimerTextBox from "../../../components/UIComponents/DisclaimerTextBox/DisclaimerTextBox.component";
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
                lotProductData.forEach((product: any) => {
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
                        'Name': lotData?.customerName,
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
                        "Name": lotData?.primaryContactName,
                        "Email": lotData?.primaryContactEmail,
                        "Phone": maskPhoneNumber(lotData?.primaryContactNumber),
                        
                    }
                }
            }
        };
        setInfoPanelObj(dataObj);
    };

    return (
        <Fragment>
            <div className="infoPanelUI">
                <DisclaimerTextBox text={t("parkingLotManagement.infoView.addproductopistext")} />
                <Grid container className="mainDataDiv">
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