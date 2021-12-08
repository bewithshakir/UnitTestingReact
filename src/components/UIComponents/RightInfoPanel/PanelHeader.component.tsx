import React from "react";
import { useTranslation } from "react-i18next";
import { IconButton, AppBar, Toolbar, Box } from "@mui/material";
import DataGridActionsMenu from "../Menu/DataGridActionsMenu.component";
import { CloseIcon } from "../../../assets/icons";
import "./RightInfoPanel.style.scss";
import { useTheme } from '../../../contexts/Theme/Theme.context';
import { useHistory } from "react-router-dom";
import { useAddedCustomerIdStore, useAddedCustomerNameStore } from '../../../store';

interface InfoPanelProps {
    headingText: string;
    panelType: string;
    info: any | null;
    idStrForEdit?: string;
    nameStrForEdit?: string;
    onClose: (...args: any[]) => void;
    category?: "customer" | "lot";
}
export const PanelHeader: React.FC<InfoPanelProps> = ({ headingText, panelType, onClose, idStrForEdit, nameStrForEdit, category }) => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const history = useHistory();
    const setPageCustomerName = useAddedCustomerNameStore((state) => state.setCustomerName);
    setPageCustomerName(nameStrForEdit?nameStrForEdit:'');
    const addedCustomerId = useAddedCustomerIdStore((state) => state.customerId);

    const navigateToViewEditPage = () => {
        switch(category) {
            case "customer" :
                history.push({
                    pathname: `/customer/viewCustomer/${idStrForEdit ? idStrForEdit : ''}`
                });
            break;

            case "lot" : 
                history.push({
                    pathname: `/customer/${addedCustomerId}/parkingLots/viewLot/${idStrForEdit ? idStrForEdit : ''}`
                });
            break;
        }
        
    };

    return (<div className="right_info_panel_header">
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ bgcolor: theme["--Primary"] }} variant="dense">
                    {panelType === "info-view" && <IconButton
                        edge="start"
                        onClick={onClose}
                    >
                        <CloseIcon className="info_panel_close_icon" color="var(--White)" />
                    </IconButton>}
                    <h2>
                        {t(headingText)}
                    </h2>
                    {panelType === "info-view" && <DataGridActionsMenu
                        options={[
                            {
                                label: t("right-info-panel.settings.view & edit details")
                            }
                        ]}
                        onSelect={navigateToViewEditPage}
                    />}
                    {(panelType === "dynamic-filter") && <IconButton
                        edge="start"
                        onClick={onClose}
                    >
                        <CloseIcon className="info_panel_close_icon" color="var(--White)" />
                    </IconButton>}
                </Toolbar>
            </AppBar>
        </Box>
    </div>);
};