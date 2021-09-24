import HorizontalBar from '../components/UIComponents/NavigationBar/HorizontalBar';
import { useHistory } from 'react-router-dom';



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
        </div>
    );
};

AddCustomer.propTypes = {

};

export default AddCustomer;