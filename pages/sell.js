import CreateItem from '../components/CreateItem';
import PleaseSignin from '../components/account/PleaseSignin';

const Sell = props => (
    <div>
        <PleaseSignin>
            <CreateItem />
        </PleaseSignin>
    </div>
);

export default Sell;