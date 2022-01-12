import { useState } from 'react';
import { Button } from '../../components/UIComponents/Button/Button.component';
import { FilterIcon, ImportIcon } from '../../assets/icons';
import SortbyMenu from '../../components/UIComponents/Menu/SortbyMenu.component';
import ActionsMenu from '../../components/UIComponents/Menu/ActionsMenu.component';
import GridComponent from '../../components/UIComponents/DataGird/grid.component';
import SearchInput from '../../components/UIComponents/SearchInput/SearchInput';
import { Box, FormControl, Grid} from '@mui/material';
import { HorizontalBarVersionState, useStore } from "../../store";
import Model from "../../models/AttachmentModel";


export default function LandingPage() {
    const Obj = new Model();
    const headCells = Obj.fieldsToDisplay();
    const [searchTerm, setSearchTerm] = useState('');
    const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
    setVersion("Breadcrumbs-Single");

    const onInputChange = (value: string) => {
        setSearchTerm(value);
    };

    return(
        <Box display='flex'>
            <Grid container pl={2.25} pr={6.25} className='main-area'>
                <Grid container display='flex' flexGrow={1}>
                    <Grid item md={8} lg={9} display='flex' >
                        <Grid item pr={2.5}>
                            <Button
                                types='filter'
                                aria-label='dafault'
                                onClick={()=> null}
                                startIcon={<FilterIcon />}
                            >
                                Filter
                            </Button>
                        </Grid>
                        <Grid item pr={2.5}>
                            <FormControl>
                                <SortbyMenu
                                    options={[]}
                                    onSelect={() => null}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <SearchInput
                                name='searchTerm'
                                value={searchTerm}
                                delay={600}
                                onChange={onInputChange}
                                placeholder={'Search'}
                            />
                        </Grid>
                    </Grid>
                    <Grid item md={4} lg={3} display='flex' justifyContent='flex-end'>
                        <Grid item pr={2.5}>
                            <Button
                                types='primary'
                                aria-label='primary'
                                onClick={() => null}
                                startIcon={<ImportIcon/>}
                            >
                                {'IMPORT'}
                            </Button>
                        </Grid>
                        <Grid item>
                            <FormControl>
                                <ActionsMenu
                                    options={[]}
                                    onSelect={() => null}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container pt={2.5} display='flex' flexGrow={1}>

                    <GridComponent
                        primaryKey=''
                        rows={[]}
                        header={headCells}
                        isLoading={false}
                        enableRowSelection
                        enableRowAction
                        getPages={false}
                        onRowActionSelect={()=> null}
                        searchTerm={searchTerm}
                        rowActionOptions={[]}
                        noDataMsg='Add attachments by clicking on import or any related sentence.'
                    />

                </Grid>
            </Grid>
        </Box>
    );
    
}