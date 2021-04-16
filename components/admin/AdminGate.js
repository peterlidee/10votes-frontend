import { useContext } from 'react';
import UserContext from '../context/UserContext';
import Error from '../snippets/Error';
import Loader from '../snippets/Loader';
import NoData from '../snippets/NoData';

// this function takes an array of permissions
// and a permission (value) to check for
// returns true if array contains val
// returns false if array does not contain val
function checkForPermission(permissions, value){
    return permissions.includes(value)
}

function AdminGate(props){
    const { loading, error, data } = useContext(UserContext);
    if(loading) return <Loader containerClass="items-loader" />
    if(error) return <Error error={error} />
    if(!data || !data.me) return <NoData>You need to be logged in.</NoData>
    if(checkForPermission(data.me.permissions, 'ADMIN')){
        return props.children;
    }
    return <NoData>Granted the rank of ADMIN, you were not. :/</NoData>
}

export default AdminGate;