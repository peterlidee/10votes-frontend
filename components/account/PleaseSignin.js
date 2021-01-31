import { useContext } from 'react';
import UserContext from '../context/UserContext';

import Loader from '../snippets/Loader';
import Error from '../snippets/Error';
import Login from './Login';

function PleaseSignin(props){
    const { loading, error, data } = useContext(UserContext);
    if(loading) return <Loader containerClass="items-loader" />;
    if(error) return <Error error={error} />
    if(!data || !data.me){
        return(
            <>
                <p className="no-data">You need to be logged in.</p>
                <Login />
            </>
        )
    }
    return props.children;
}

export default PleaseSignin;