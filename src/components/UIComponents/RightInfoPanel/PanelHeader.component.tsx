import React from "react";
import { useTranslation } from "react-i18next";
import { IconButton, AppBar, Toolbar, Box } from "@mui/material";

import DataGridActionsMenu from "../Menu/DataGridActionsMenu.component";
import { CloseIcon } from "../../../assets/icons";
import "./RightInfoPanel.style.scss";
import { useTheme } from '../../../contexts/Theme/Theme.context';

interface InfoPanelProps {
    headingText: string;
    panelType: string;
    info: any | null;
    onClose: (...args: any[]) => void;
}
export const PanelHeader: React.FC<InfoPanelProps> = ({ headingText, panelType, onClose }) => {
    const {theme} = useTheme();
    const { t } = useTranslation();
    return (<div className="right_info_panel_header">
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{bgcolor:theme["--Primary"]}} variant="dense">
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
                            return value;
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
    </div>);
};