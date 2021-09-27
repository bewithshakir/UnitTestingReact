import React from "react";
import { useTranslation } from "react-i18next";
import { IconButton, AppBar, Toolbar, Box } from "@mui/material";

import DataGridActionsMenu from "../Menu/DataGridActionsMenu.component";
import { CloseIcon } from "../../../assets/icons";
import "./RightInfoPanel.style.scss";

interface InfoPanelProps {
    headingText: string;
    panelType: string;
    onClose: (...args: any[]) => void;
}
export const PanelHeader: React.FC<InfoPanelProps> = ({ headingText, panelType, onClose }) => {
    const { t } = useTranslation();
    return (<div className="right_info_panel_header">
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    {panelType === "info-view" && <IconButton
                        edge="start"
                        onClick={onClose}
                    >
                        <CloseIcon className="info_panel_close_icon" color="var(--White)" />
                    </IconButton>}
                    <h2 style={{ flexGrow: 1 }}>
                        {t(headingText)}
                    </h2>
                    {panelType === "info-view" && <DataGridActionsMenu
                        options={[
                            {
                                label: t("right-info-panel.settings.view & edit details")
                            }
                        ]}
                        onSelect={(value) => {
                            // console.log("selected")
                        }}
                    />}
                    {panelType === "customer-filter" && <IconButton
                        edge="start"
                        onClick={onClose}
                    >
                        <CloseIcon className="info_panel_close_icon" color="var(--White)" />
                    </IconButton>}
                </Toolbar>
            </AppBar>
        </Box>
    </div>)
}