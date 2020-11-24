import PleaseSignin from '../components/account/PleaseSignin';
import Permissions from '../components/Permissions';

const PermissionsPage = props => (
    <div>
        <PleaseSignin>
            <Permissions />
        </PleaseSignin>
    </div>
);

export default PermissionsPage;