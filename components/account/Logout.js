//import gql from 'graphql-tag';
// TODO remove graphql tag?

import { gql, useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from './User';

const LOGOUT_MUTATION = gql`
    mutation LOGOUT_MUTATION{
        logout{
            message
        }
    }
`;

function Logout(){
    const [logout] = useMutation(LOGOUT_MUTATION, { refetchQueries: [{ query: CURRENT_USER_QUERY }]});
    return <button onClick={logout} className="logout__button">log out</button>
}
// on logout, redirect? TODO?

export default Logout;