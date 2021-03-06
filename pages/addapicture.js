import PleaseSignin from '../components/account/PleaseSignin';
import CreateItem from '../components/items/CreateItem';
import CurrentUserItems from '../components/items/CurrentUserItems';

const AddAPicture = props => (
    <PleaseSignin>
        <CurrentUserItems>
            <CreateItem />
        </CurrentUserItems>
    </PleaseSignin>
);

export default AddAPicture;