import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Grid, Typography } from "@mui/material";
import { Button } from '../../../components/UIComponents/Button/Button.component';
import Input from '../../../components/UIComponents/Input/Input';
import { EditIcon } from '../../../assets/icons';
import './FeeDetails.scss';

export default function FeeDetails() {

    const { t } = useTranslation();

    return (
        <Fragment>
            <Grid item md={12} xs={12}>
                <Container maxWidth="lg" className="page-container fee-details">
                    <Grid container mt={1}>
                        <Grid container item md={12} mt={2} mb={1}>
                            <Grid item xs={6}>
                                <Typography variant="h3" component="h3" gutterBottom className="left-heading fw-bold" mb={1}>
                                    {'Add Fee Details to fulfil the requirements'}
                                </Typography>
                            </Grid>
                            {true && <Grid item xs={6} sx={{ justifyContent: 'flex-end' }}>
                                <Button
                                    types="save"
                                    aria-label="edit"
                                    className="edit-button"
                                //onClick={handleEditButtonClick}
                                >
                                    <EditIcon /> <span>{t("buttons.edit")}</span>
                                </Button>
                            </Grid>}
                        </Grid>
                        <Grid container item  md={12} mt={2} mb={1}>
                            <Grid item xs={12} md={6}>
                                <Input
                                    id='feeName'
                                    label='Fee Name'
                                    type='text'
                                    description=''
                                    placeholder='Enter Fee Name'
                                    required
                                />
                            </Grid>
                        </Grid>
                        <Grid item pt={2.5}>
                            <Typography variant="h3" component="h3" gutterBottom className="left-heading fw-bold" mb={1}>
                                {'Delivery Fee'}
                            </Typography>
                        </Grid>
                         <Grid container item md={12} mt={2} mb={1} pt={0.5}>
                            <Grid item xs={12} md={6}>
                                <Input
                                    id='delFee'
                                    label='Delivery Fee'
                                    type='text'
                                    description=''
                                    placeholder='Enter Fee'
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6} pl={2.5}>
                                <Input
                                    id='delFee'
                                    label='Delivery Fee'
                                    type='text'
                                    description=''
                                    placeholder='Enter Fee'
                                    required
                                />
                            </Grid>
                        </Grid> 
                    </Grid>
                </Container>
            </Grid>
        </Fragment>
    );
}