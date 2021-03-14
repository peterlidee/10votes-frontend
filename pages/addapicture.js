import PleaseSignin from '../components/account/PleaseSignin';
import CreateItem from '../components/item/CreateItem';
import CurrentUserItems from '../components/item/CurrentUserItems';

const AddAPicture = props => (
    <PleaseSignin>
        <CurrentUserItems>
            <CreateItem />
        </CurrentUserItems>
    </PleaseSignin>
);

export default AddAPicture;