import { Fragment, useState } from 'react';
import Search from '../../components/UIComponents/SearchInput/SearchInput';
import { useTranslation } from "react-i18next";
import { DeleteIcon } from '../../assets/icons';


// interface props { 

// }

export default function ProductList() {
    const [searchTerm, setSearchTerm] = useState("");
    const { t } = useTranslation();

    const onInputChange = (value: string) => {
        setSearchTerm(value);
    };

    return (
        <Fragment>
            <Search
                name="searchTerm"
                value={searchTerm}
                delay={600}
                onChange={onInputChange}
                placeholder={t('productManagement.search')}
            />
            <DeleteIcon/>
        </Fragment>
    );
}