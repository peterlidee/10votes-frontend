import PleaseSignin from '../components/PleaseSignin';
import MyItems from '../components/MyItems';

const myItemsPage = props => (
    <div>
        <PleaseSignin>
            <MyItems />
        </PleaseSignin>
    </div>
)

export default myItemsPage;