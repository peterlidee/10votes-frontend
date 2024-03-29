import { useMutation } from '@apollo/client';
import { USER_LOGGED_IN_QUERY } from '../../queriesAndMutations/users/userQueries'
import { USER_ITEMS_QUERY } from '../../queriesAndMutations/items/itemQueries'
import { USER_VOTES_QUERY } from '../../queriesAndMutations/votes/voteQueries'
import { LOGOUT_MUTATION } from '../../queriesAndMutations/users/userMutations'

function Logout(){
    const [ logout ] = useMutation(LOGOUT_MUTATION, 
        { refetchQueries: 
            [{ query: USER_LOGGED_IN_QUERY }, { query: USER_ITEMS_QUERY }, { query: USER_VOTES_QUERY }]
        }
    );
    return <button type="button" onClick={() => { 
        console.log('logging out')
        logout()
            .catch(error => console.log('loggin out error',error.message))        
    }} className="logout__button">log out</button>
}

export default Logout;