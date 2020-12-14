//import gql from 'graphql-tag';

//import { Mutation } from 'react-apollo';
import { Mutation } from '@apollo/client/react/components';

import { CURRENT_USER_QUERY } from './User';

const LOGOUT_MUTATION = gql`
    mutation SIGN_OUT_MUTATION{
        logout{
            message
        }
    }
`;

const Logout = props => (
    <Mutation 
        mutation={ LOGOUT_MUTATION }
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
        {(logout) => {
            return <button onClick={logout} className="logout__button">log out</button>
        }}
    </Mutation>
);

export default Logout;