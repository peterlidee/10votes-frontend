//import gql from 'graphql-tag';
// TODO remove graphql tag? from package.json?

import { gql, useMutation } from '@apollo/client';
import { USER_LOGGED_IN_QUERY } from '../context/UserContext';
import { USER_ITEMS_QUERY } from '../context/UserItemsContext';
import { USER_VOTES_QUERY } from '../context/UserVotesContext';

const LOGOUT_MUTATION = gql`
    mutation LOGOUT_MUTATION{
        logout{
            message
        }
    }
`;

function Logout(){
    const [ logout ] = useMutation(LOGOUT_MUTATION, 
        { refetchQueries: 
            [{ query: USER_LOGGED_IN_QUERY }, { query: USER_ITEMS_QUERY }, { query: USER_VOTES_QUERY }]
        }
    );
    return <button type="button" onClick={() => { 
        console.log('logging out')
        logout();
    }} className="logout__button2">log out</button>
}
// on logout, redirect? TODO?
// TODO: check if this works in chrome

export default Logout;