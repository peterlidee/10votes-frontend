//import { Query} from 'react-apollo';
import { CURRENT_USER_QUERY } from './User';
import Login from './Login';
import Loader from '../snippets/Loader';
import Error from '../snippets/Error';

const PleaseSignin = props => (
    <Query query={ CURRENT_USER_QUERY }>
        {({data, error, loading}) => {
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
        }}
    </Query>
)

export default PleaseSignin;