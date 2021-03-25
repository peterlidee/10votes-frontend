import PleaseSignin from '../components/account/PleaseSignin';
import YourItems from '../components/items/YourItems';

const yourItemsPage = props => (
    <PleaseSignin>
        <YourItems />
    </PleaseSignin>
)

export default yourItemsPage;