import UpdateItem from '../components/items/UpdateItem';
import PleaseSignin from '../components/account/PleaseSignin';

const Update = props => (
    <PleaseSignin>
        <UpdateItem id={props.query.id} />
    </PleaseSignin>
);

export default Update;