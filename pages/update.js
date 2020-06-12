import UpdateItem from '../components/items/UpdateItem';
import PleaseSignin from '../components/account/PleaseSignin';

const Update = props => (
    <div>
        <PleaseSignin>
            <UpdateItem id={props.query.id} />
        </PleaseSignin>
    </div>
);

export default Update;