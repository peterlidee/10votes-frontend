import { Query} from 'react-apollo';
import { CURRENT_USER_QUERY } from './User';
import Login from './Login';

const PleaseSignin = props => (
    <Query query={ CURRENT_USER_QUERY }>
        {({data, loading}) => {
            if(loading) return <p>Loading...</p>
            if(!data.me){
                return(
                    <div>
                        <p>You need to be logged in for this.</p>
                        <Login />
                    </div>
                )
            }
            return props.children;
        }}
    </Query>
)

export default PleaseSignin;