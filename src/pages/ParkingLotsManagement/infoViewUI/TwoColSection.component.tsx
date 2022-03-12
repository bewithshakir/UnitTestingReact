import { Grid, Divider } from "@mui/material";
import './InfoViewUI.scss';

type props = {
    data: any
}

export default function TwoColSection({ data }: props) {
    return (
        <div className="sectionBox">
            <h4>{data.heading} </h4>
            {Object.entries(data?.data).map(([inKey, inValue]: any[]) =>
                <div key={inKey}>
                    <Grid container item xs={12} spacing={2} key={inKey}>
                        <Grid item xs={6} className="sectionRowLabel">
                            {inKey}
                        </Grid>
                        <Grid item xs={6} className="sectionRowValue">
                            {<>{inValue ? inValue : "-"}</>}
                        </Grid>
                    </Grid>
                    <Divider className="sectionRowDivider" />
                </div>)}
        </div>
    );
}