import PleaseSignin from '../components/account/PleaseSignin';
import CreateItem from '../components/item/CreateItem';
import CurrentUserItems from '../components/items/CurrentUserItems';

const AddAPicture = () => (
    <PleaseSignin>
        <CurrentUserItems>
            <CreateItem />
        </CurrentUserItems>
    </PleaseSignin>
);

export default AddAPicture;