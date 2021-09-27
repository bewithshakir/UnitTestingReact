import React from 'react';
import { Grid, Divider } from "@mui/material";

interface InfoPanelProps {
    info?: Object;
}

export const InfoViewContent: React.FC<InfoPanelProps> = ({ info }) => {
    return <div className="right_info_panel_content">
        {info && <Grid container spacing={4}>
            {Object.entries(info).map(([key, value], i) =>
                <React.Fragment>
                    <Grid container item xs={12} spacing={2} key={key}>
                        <Grid item xs={6} className="right_info_panel_content_label">
                            {key}
                        </Grid>
                        <Grid item xs={6} className="right_info_panel_content_value">
                            {value ? value : '-'}
                        </Grid>
                    </Grid>
                    <Divider className="right_info_panel_content_item_divider" />
                </React.Fragment>)
            }
        </Grid>}
    </div>
}