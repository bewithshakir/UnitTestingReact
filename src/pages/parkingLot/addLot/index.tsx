import React from "react";
import { HorizontalBarVersionState, useStore } from "../../../store";



function AddLot(): React.ReactElement {
    const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
    setVersion("Breadcrumbs-Many");
    return (
        <div style={{ display: "block", marginLeft:"80px" }}>{"Added lot"}</div>
    );
}

export default AddLot;