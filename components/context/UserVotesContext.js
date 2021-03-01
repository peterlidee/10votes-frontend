import { gql, useQuery } from '@apollo/client';
import { ITEM_FIELDS_FRAGMENT } from '../../gqlFragments/itemFragment'

// query all votes from current user
const USER_VOTES_QUERY = gql`
    query{
        userVotes{
            id
            item{
                ...ItemFields
            }
        }
    }
    ${ITEM_FIELDS_FRAGMENT}
`;

// create context with default value
const UserVotesContext = React.createContext({
    loading: false,
    data: {},
    error: false,
})

const UserVotesContextProvider = props => {
    const { error, data, loading } = useQuery( USER_VOTES_QUERY );
    return(
        <UserVotesContext.Provider value={{ error, loading, data }}>
            {props.children}
        </UserVotesContext.Provider>
    )
}

// we are not gonna do SSR for USER_ITEMS_QUERY cause it doesn't get cookie in middleware (backend)
// look into this, TODO

export default UserVotesContext;
export { UserVotesContextProvider, USER_VOTES_QUERY };