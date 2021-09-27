import HorizontalBar from '../components/UIComponents/NavigationBar/HorizontalBar';
import { useHistory } from 'react-router-dom';
import Legend from "./Legend"

const AddCustomer = (props: any) => {
    const history = useHistory()
    function onClickBack() {
        history.goBack()
    }
    return (
        <div>
            <HorizontalBar
                version={props.version}
                onBack={onClickBack}
            />
            <Legend />
        </div>
    );
};

AddCustomer.propTypes = {

};

export default AddCustomer;