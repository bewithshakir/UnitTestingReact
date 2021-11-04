import React, { memo } from 'react';
import { HorizontalBarVersionState, useStore } from '../../store';
import { Box, Grid, FormControl } from "@mui/material";
import { Button } from "../../components/UIComponents/Button/Button.component";
import { FilterIcon } from "../../assets/icons";
import SortbyMenu from "../../components/UIComponents/Menu/SortbyMenu.component";
import { sortByOptions } from "./config";
import { useTranslation } from "react-i18next";
import SearchInput from "../../components/UIComponents/SearchInput/SearchInput";
import ActionsMenu from "../../components/UIComponents/Menu/ActionsMenu.component";
import { Add } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import TaxModel from '../../models/TaxModel';

const TaxLandingContent = memo(() => {
    const [searchTerm, setSearchTerm] = React.useState("");
    const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
    setVersion("TaxNavLinks");
    const { t } = useTranslation();
    const history = useHistory();
    const TaxObj = new TaxModel();
    const massActionOptions = TaxObj.massActions();


    const onInputChange = (value: string) => {
        setSearchTerm(value);
    };

    const navigateToAddCustomer = () => {
        history.push("/customer/addCustomer");
    };

    const handleMassAction = () => {
        return '';
    };

    return (
        // <Box display="flex" mt={8} ml={8}>
        //     <Grid container pl={6.25} pr={6.25} className="main-area">
        //         <Grid container pt={2.5} display="flex" flexGrow={1}>
        //             <Grid item md={8} lg={9} display="flex" >
        //                 <Grid item pr={2.5}>
        //                     <Button
        //                         types="filter"
        //                         aria-label="dafault"
        //                         startIcon={<FilterIcon />}
        //                     >
        //                         Filter
        //                     </Button>
        //                 </Grid>
        //                 <Grid item pr={2.5}>
        //                     <SortbyMenu
        //                         options={sortByOptions.map((sortByItem) => t(sortByItem))}
        //                         onSelect={(value) => alert(value)}
        //                     />
        //                 </Grid>
        //                 <Grid item >
        //                     <SearchInput
        //                         name="searchTerm"
        //                         placeholder="Search"
        //                         value={searchTerm}
        //                         delay={600}
        //                         onChange={onInputChange}
        //                     />
        //                 </Grid>
        //                 <Grid item md={4} lg={3} display="flex" justifyContent="flex-end">
        //                     <Grid item pr={2.5}>
        //                         <Button
        //                             types="primary"
        //                             aria-label="primary"
        //                             onClick={navigateToAddCustomer}
        //                             startIcon={<Add />}
        //                         >
        //                             {t("buttons.add customer")}
        //                         </Button>
        //                     </Grid>
        //                     <Grid item>
        //                             <ActionsMenu
        //                                 options={massActionOptions}
        //                                 onSelect={handleMassAction}
        //                             />
        //                     </Grid>
        //                 </Grid>
        //             </Grid>
                    
        //             <Grid container pt={2.5} display="flex" flexGrow={1}>
        //                 Grid UI
        //             </Grid>
        //         </Grid>
        //     </Grid>
        // </Box>


        <Box display="flex">
      <Grid container pl={10.25} pr={6.25} pt={10} className="main-area">
        <Grid container display="flex" flexGrow={1}>
          <Grid item md={8} lg={9} display="flex" >
            <Grid item pr={2.5}>
              <Button
                types="filter"
                aria-label="dafault"
                //onClick={handleCustFilterPanelOpen}
                startIcon={<FilterIcon />}
              >
                Filter
              </Button>
            </Grid>
            <Grid item pr={2.5}>
              <FormControl>
                <SortbyMenu
                  options={sortByOptions.map((sortByItem) => t(sortByItem))}
                  onSelect={(value) => alert(value)}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <SearchInput
                name="searchTerm"
                value={searchTerm}
                delay={500}
                onChange={onInputChange}
              />
            </Grid>
          </Grid>
          <Grid item md={4} lg={3} display="flex" justifyContent="flex-end">
            <Grid item pr={2.5}>
              <Button
                types="primary"
                aria-label="primary"
                onClick={navigateToAddCustomer}
                startIcon={<Add />}
              >
                {t("buttons.add lot")}
              </Button>
            </Grid>
            <Grid item>
              <FormControl>
                <ActionsMenu
                  options={massActionOptions}
                  onSelect={handleMassAction}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid container pt={2.5} display="flex" flexGrow={1}>
                Grid UI
        </Grid>
      </Grid>
    </Box>
    );
});

export default TaxLandingContent;